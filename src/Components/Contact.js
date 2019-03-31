import React from "react";
import { ListGroupItem } from "reactstrap";
const style = {
  margin: "1rem"
};

const Contact = props => {
  const { name, username, email, phone } = props.contact;

  return (
    <ListGroupItem style={style}>
      <h4>{name}</h4>
      {username && (
        <p>
          Username: <br />
          {username}
        </p>
      )}
      {email && (
        <p>
          Email: <br />
          {email}
        </p>
      )}
      {phone && (
        <p>
          Phone: <br />
          {phone}
        </p>
      )}
    </ListGroupItem>
  );
};

export default Contact;
