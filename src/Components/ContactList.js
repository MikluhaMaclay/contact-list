import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Contact from "../Components/Contact";
import CreateContact from "./CreateContact";
import Modal from "./Modal";
import BackDrop from "./BackDrop";
import NavBar from "./NavBar";

import { loadContacts } from "../utils/LocalStorage";
import { sortAlphabetical } from "../utils/Sort";
import uuid from "uuid";
import styled from "styled-components";

const IndexLine = styled.hr`
  border: 1px solid black;
  width: 100%;
`;

const IndexLetter = styled.h3`
  padding: 2rem 0rem 0rem 1rem;
`;

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [isReverse, setIsReverse] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editedContact, setEditedContact] = useState(null);

  const showContactModal = () => {
    setShowModal(!showModal);
  };

  const submitModalHandler = contact => {
    if (!editedContact) {
      setContacts([...contacts, contact].sort(sortAlphabetical));
    } else {
      let newContacts = [...contacts];
      let index = newContacts.findIndex(el => el.id === contact.id);
      newContacts[index] = contact;
      console.log(contact);
      setContacts(newContacts.sort(sortAlphabetical));
      setEditedContact(null);
    }
    setShowModal(!showModal);
  };

  const modalCancelHandler = () => {
    setShowModal(!showModal);
    setEditedContact(null);
  };

  const deleteContactHandler = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const editContactButtonHandler = contact => {
    setEditedContact(contact);
    setShowModal(!showModal);
  };

  useEffect(() => {
    let contacts = loadContacts();
    if (!contacts) {
      fetch("http://demo.sibers.com/users")
        .then(response => {
          return response.json();
        })
        .then(data => {
          const cleanedData = data.map(contact => {
            const { name, email, username, phone } = contact;
            return {
              name,
              email,
              username,
              phone,
              id: uuid()
            };
          });

          const state = cleanedData.sort(sortAlphabetical);
          setContacts(state);
        });
    } else {
      setContacts(contacts);
    }
  }, []);

  const renderContacts = contacts => {
    if (isReverse) {
      contacts = contacts.slice().reverse();
      // setContacts(contacts1);
    }

    let lastLetter = "";

    return contacts.map(contact => {
      if (lastLetter.toUpperCase() !== contact.name[0].toUpperCase()) {
        lastLetter = contact.name[0].toUpperCase();
        return (
          <React.Fragment key={contact.id}>
            <IndexLetter>{lastLetter}</IndexLetter>
            <IndexLine />
            <Contact
              contact={contact}
              deleteContactHandler={deleteContactHandler}
              editContactButtonHandler={editContactButtonHandler}
            />
          </React.Fragment>
        );
      }
      return (
        <Contact
          key={contact.id}
          contact={contact}
          deleteContactHandler={deleteContactHandler}
          editContactButtonHandler={editContactButtonHandler}
        />
      );
    });
  };

  return (
    <React.Fragment>
      <NavBar
        sortHandler={() => {
          setIsReverse(!isReverse);
        }}
      />
      <ListGroup>
        {renderContacts(contacts)}
        <CreateContact showCreateContactModal={showContactModal} />
        {showModal && <BackDrop />}
        {showModal && (
          <Modal
            canCancel
            canCreate
            title="Create new contact"
            onSubmit={submitModalHandler}
            onCancel={modalCancelHandler}
            editedContact={editedContact}
          />
        )}
      </ListGroup>
    </React.Fragment>
  );
}

export default ContactList;
