import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactListItem from "../ContactListItem";
import "./ContactList.css";

export default function ContactList({ visibleContacts, onRemove }) {
  return (
    <>
      <TransitionGroup component="ul" className="ContactList">
        {visibleContacts.map(({ name, id, number }) => (
          <CSSTransition key={id} timeout={250} classNames="contactListItem">
            <ContactListItem
              itemName={name}
              itemNumber={number}
              onRemoveItem={() => onRemove(id)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
      {/* <ul className="ContactList">
        {visibleContacts.map(({ name, id, number }) => (
          <CSSTransition
            in={true}
            appear={true}
            key={id}
            timeout={250}
            classNames="contactListItem"
            unmountOnExit
          >
            <ContactListItem
              itemName={name}
              // itemNumber={number}
              onRemoveItem={() => onRemove(id)}
            />
          </CSSTransition>
        ))}
      </ul> */}
    </>
  );
}
