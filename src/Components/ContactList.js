import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadContacts } from "../utils/LocalStorage";
import Contact from "../Components/Contact";
import { sortAlphabetical } from "../utils/Sort";
import uuid from "uuid";

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
            <h3 style={{padding: "2rem 0rem 0rem 1rem"}}>{lastLetter}</h3>
            <hr style={{border: "1px solid black", width: "100%"}}/>
            <Contact key={contact.id} contact={contact} />
          </React.Fragment>
        );
      }
      return <Contact key={contact.id} contact={contact} />;
    });
  };

  return <ListGroup>{renderContacts(contacts)}</ListGroup>;
}

export default ContactList;
