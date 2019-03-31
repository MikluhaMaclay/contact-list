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
  const [creating, setCreating] = useState(false);

  const showCreateContactModal = () => {
    setCreating(!creating);
  };

  const createContactHandler = contact => {
    setContacts([...contacts, contact].sort(sortAlphabetical));
    setCreating(!creating);
  };

  const modalCancelHandler = () => {
    setCreating(!creating);
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
      contacts = contacts.reverse();
      // setContacts(contacts1);
    }
    console.log(isReverse, contacts);

    let lastLetter = "";

    return contacts.map(contact => {
      if (lastLetter.toUpperCase() !== contact.name[0].toUpperCase()) {
        lastLetter = contact.name[0].toUpperCase();
        return (
          <React.Fragment key={contact.id}>
            <IndexLetter>{lastLetter}</IndexLetter>
            <IndexLine />
            <Contact contact={contact} />
          </React.Fragment>
        );
      }
      return <Contact key={contact.id} contact={contact} />;
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
        <CreateContact showCreateContactModal={showCreateContactModal} />
        {creating && <BackDrop />}
        {creating && (
          <Modal
            canCancel
            canCreate
            title="Create new contact"
            onSubmit={createContactHandler}
            onCancel={modalCancelHandler}
          />
        )}
      </ListGroup>
    </React.Fragment>
  );
}

export default ContactList;
