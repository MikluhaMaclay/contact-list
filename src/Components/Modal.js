import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, FormGroup, Label, Input, Alert } from "reactstrap";
import uuid from "uuid";

const ModalWindow = styled.div`
  width: 90%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: fixed;
  top: 20vh;
  left: 5%;

  @media (min-width: 769px) {
    width: 30rem;
    left: calc((100% - 30rem) / 2);
  }

  > header {
    padding: 1rem;
    background: #4286f4;
    color: white;
    > h1 {
      margin: 0;
      font-size: 1.25rem;
    }
  }
`;

const ModalContent = styled.section`
  padding: 1rem;
`;

const ModalButtons = styled.section`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

const Button = styled.button`
  background-color: #4286f4;
  font: inherit;
  border: 1px solid #4286f4;
  border-radius: 3px;
  color: white;
  padding: 0.25rem 1rem;
  margin-right: 1rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.26);
  transition: box-shadow 0.3s ease-in-out;
  cursor: pointer;

  &:hover,
  &:active {
    box-shadow: 2px 2px 5px rgba(66, 134, 244, 0.7);
    background-color: #4286f4;
  }

  &:focus {
    outline-color: #4286f4;
  }
`;

const Modal = props => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const submitHandler = () => {
    try {
      if (!name) {
        throw new Error("Name cant be empty");
      }
      const contact = { email, phone, username, name };
      if (props.editedContact) {
        contact.id = props.editedContact.id;
      }
      props.onSubmit(contact);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (props.editedContact) {
      const { email, phone, username, name } = props.editedContact;
      setEmail(email);
      setName(name);
      setUsername(username);
      setPhone(phone);
    }
  }, []);

  return (
    <ModalWindow>
      <header>{props.title}</header>
      <ModalContent>
        <Form>
          <FormGroup>
            <Label for="nameField">Name</Label>
            <Input
              type="text"
              name="name"
              id="nameField"
              placeholder="Contact's name"
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="usernameField"
              placeholder="Contact's username"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="emailField">Email</Label>
            <Input
              type="email"
              name="email"
              id="emailField"
              placeholder="Contact's email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phoneField">Phone</Label>
            <Input
              type="phone"
              name="phone"
              id="emailField"
              placeholder="Contact's phone"
              value={phone}
              onChange={e => {
                setPhone(e.target.value);
              }}
            />
          </FormGroup>
        </Form>
      </ModalContent>
      {error && <Alert color="danger">{error}</Alert>}
      <ModalButtons>
        {props.canCancel && <Button onClick={props.onCancel}>Cancel</Button>}
        {props.canCreate && <Button onClick={submitHandler}>Submit</Button>}
      </ModalButtons>
    </ModalWindow>
  );
};

export default Modal;
