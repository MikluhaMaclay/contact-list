import React from "react";
import { ListGroupItem } from "reactstrap";
const style = {
    margin: "1rem"
}

const Contact = (props) => {
  const {
    name,
    username,
    email,
    phone
  } = props.contact;

  return (<ListGroupItem style={style}>
      <h4>{name}</h4>
      <p>{username}</p>
      <p>{email}</p>
  </ListGroupItem>);
}

export default Contact;
