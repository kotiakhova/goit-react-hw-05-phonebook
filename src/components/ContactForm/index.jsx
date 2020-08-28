import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

import style from "./ContactForm.module.css";
import "./ContactForm.css";

export default class ContactForm extends Component {
  state = {
    name: "",
    number: "",
    isCorrect: false,
    isFull: false,
  };
  handleChange = (e) => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };

  nameChecking() {
    let check = false;
    this.props.contacts.forEach((stateContact) => {
      if (stateContact.name.toLowerCase() === this.state.name.toLowerCase()) {
        check = this.state.name;
      }
    });
    return check;
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    if (this.nameChecking()) {
      this.setState({ isCorrect: true });
      setTimeout(() => {
        this.setState({ isCorrect: false });
      }, 4000);
    } else {
      if (this.state.name && this.state.number) {
        this.setState({ name: "", number: "", isCorrect: false });
        this.props.onAddContact(this.state.name, this.state.number);
      } else {
        this.setState({ isFull: true });
        setTimeout(() => {
          this.setState({ isFull: false });
        }, 4000);
      }
    }
  };
  render() {
    const { number, name, isCorrect, isFull } = this.state;
    return (
      <>
        <div className={style.container}>
          <form onSubmit={this.handleSubmit}>
            <label>
              <p>Name</p>
              <input
                name="name"
                type="text"
                placeholder="Enter name"
                onChange={this.handleChange}
                value={name}
              />
            </label>
            <label>
              <p>Number</p>
              <input
                name="number"
                type="text"
                placeholder="Enter number"
                onChange={this.handleChange}
                value={number}
              />
            </label>
            <button type="submit">Add contact </button>
          </form>
          {/* {isCorrect && (
            <CSSTransition
              in={true}
              appear={true}
              classNames="errorModal"
              timeout={250}
              unmountOnExit
            >
              <div
                className={style.errorModal}
              >{`${this.nameChecking()} is already in contact`}</div>
            </CSSTransition>
          )} */}
          {/* {isFull && (
            <CSSTransition
              in={true}
              appear={true}
              classNames="errorModal"
              timeout={250}
              unmountOnExit
            >
              <div className={style.errorModal}>{`Write name and number`}</div>
            </CSSTransition>
          )} */}
          <CSSTransition
            in={isCorrect ? true : false}
            appear={true}
            classNames="errorModal"
            timeout={250}
            unmountOnExit
          >
            <div
              className={style.errorModal}
            >{`${this.nameChecking()} is already in contact`}</div>
          </CSSTransition>
          <CSSTransition
            in={isFull ? true : false}
            appear={true}
            classNames="errorModal"
            timeout={250}
            unmountOnExit
          >
            <div className={style.errorModal}>{`Write name and number`}</div>
          </CSSTransition>
        </div>
      </>
    );
  }
}
