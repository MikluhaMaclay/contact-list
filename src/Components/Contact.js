import React from "react";
import { ListGroupItem} from "reactstrap";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faUserEdit } from "@fortawesome/free-solid-svg-icons";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div > svg {
    &:nth-child(1) {
      margin-right: 5px;
    }
    cursor: pointer;
    filter: drop-shadow(0 0 1px #777);

    &:hover {
      filter: drop-shadow(0 0 3px #777);
    }

    &:active {
      filter: drop-shadow(0 0 3px blue);
    }
  }
`;

const Actions = styled.div``;

const Contact = props => {
  const { name, username, email, phone, id } = props.contact;

  const deleteHandler = () => {
    props.deleteContactHandler(id);
  };

  const editHandler = () => {
    props.editContactButtonHandler(props.contact);
  };

  return (
    <ListGroupItem style={{ margin: "1rem" }}>
      <Header>
        <h4>{name}</h4>
        <Actions>
          <FontAwesomeIcon
            onClick={editHandler}
            icon={faUserEdit}
            style={{ width: "3rem", height: "3rem", color: "#4286f4" }}
          />
          <FontAwesomeIcon
            onClick={deleteHandler}
            icon={faWindowClose}
            style={{ width: "3rem", height: "3rem", color: "#4286f4" }}
          />
        </Actions>
      </Header>
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
