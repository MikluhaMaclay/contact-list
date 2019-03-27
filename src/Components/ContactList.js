import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadContacts } from "../utils/LocalStorage";
import Contact from '../Components/Contact';

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    let contacts = loadContacts();
    if (!contacts) {
      fetch("http://demo.sibers.com/users")
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          setContacts(data);
        });
    }
  }, []);

  return (
    <ListGroup>
      {contacts.map((contact, index) => {
        return <Contact key={index} contact={contact} />;
      })}
    </ListGroup>
  );
}

export default ContactList;
