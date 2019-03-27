import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadContacts } from "../utils/LocalStorage";
import Contact from "../Components/Contact";
import { sortAlphabetical } from "../utils/Sort";
import uuid from 'uuid';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [sort, setSort] = useState("descending");

  useEffect(() => {
    let contacts = loadContacts();
    let sortedContacts;
    if (!contacts) {
      fetch("http://demo.sibers.com/users")
        .then(response => {
          return response.json();
        })
        .then(data => {
          const cleanedData = data.map(contact => {
            const { name, email, username, phone, } = contact;
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

  useEffect(() => {
    if (sort === "descending") {
      setContacts(contacts.reverse())
    } else {

    }
  }, [contacts]);

  const renderContacts = (contacts) => {
    if(sort === 'ascending') {
        contacts = contacts.reverse();
    }

    return contacts.map((contact) => {
        return <Contact key={contact.id} contact={contact} />;
    })
  }

  return (
    <ListGroup>
      {renderContacts(contacts)}
    </ListGroup>
  );
}

export default ContactList;
