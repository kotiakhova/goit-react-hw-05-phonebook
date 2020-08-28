import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";

import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";
import styles from "./App.module.css";
import "./App.css";

export default class App extends Component {
  state = {
    contacts: [
      // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      // { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");
    persistedContacts &&
      this.setState({ contacts: JSON.parse(persistedContacts) });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  addContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    this.setState((prevState) => {
      return {
        contacts: [contact, ...prevState.contacts],
      };
    });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  handleFilter = (e) => {
    this.setState({ filter: e.target.value });
  };
  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { contacts } = this.state;

    return (
      <div className={styles.container}>
        <CSSTransition
          in={true}
          appear={true}
          classNames="logo"
          timeout={500}
          unmountOnExit
        >
          <h1 className={styles.logo}>Phonebook</h1>
        </CSSTransition>
        <ContactForm
          onAddContact={this.addContact}
          contacts={this.state.contacts}
        />
        <h2>Contacts</h2>
        {/* 
        {contacts.length > 1 && (
          <CSSTransition
            in={true}
            appear={true}
            classNames="filter"
            timeout={500}
            unmountOnExit
          >
            <Filter onHandleFilter={this.handleFilter} />
          </CSSTransition>
        )} */}
        {contacts.length > 0 && (
          <CSSTransition
            in={contacts.length > 1 ? true : false}
            appear={true}
            classNames="filter"
            timeout={500}
            unmountOnExit
          >
            <Filter onHandleFilter={this.handleFilter} />
          </CSSTransition>
        )}

        {contacts.length > 0 && (
          <ContactList
            visibleContacts={visibleContacts}
            onRemove={this.removeContact}
          />
        )}
      </div>
    );
  }
}
