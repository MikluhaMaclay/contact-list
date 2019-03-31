import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Contact from "../Components/Contact";
import CreateContact from './CreateContact';

import { loadContacts } from "../utils/LocalStorage";
import { sortAlphabetical } from "../utils/Sort";
import uuid from "uuid";
import styled from 'styled-components';


const IndexLine = styled.hr`
border: 1px solid black;
width: 100%;
`;

const IndexLetter = styled.h3`
padding: 2rem 0rem 0rem 1rem;
`;

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [sort, setSort] = useState("ascending");

  const createContactButtonHandler = {
    
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

          console.log(cleanedData);
          const state = cleanedData.sort(sortAlphabetical);
          setContacts(state);
        });
    } else {
      setContacts(contacts);
    }
  }, []);

  const renderContacts = contacts => {
    if (sort === "ascending") {
      contacts = contacts.reverse();
    }

    let lastLetter = "";

    return contacts.map(contact => {
      if (lastLetter !== contact.name[0]) {
        lastLetter = contact.name[0];
        return (
          <React.Fragment>
            <IndexLetter>{lastLetter}</IndexLetter>
            <IndexLine/>
            <Contact key={contact.id} contact={contact} />
          </React.Fragment>
        );
      }
      return <Contact key={contact.id} contact={contact} />;
    });
  };

  return (<ListGroup>
    {renderContacts(contacts)}
    <CreateContact createContactButtonHandler={createContactButtonHandler}></CreateContact>
  </ListGroup>)
}

export default ContactList;
