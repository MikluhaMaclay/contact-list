import React from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'



const AddButton = styled.div`
    position: fixed;
    left: 70%;
    top: 80%;
    cursor: pointer;
    filter: drop-shadow(0 0 1px #777);

    &:hover {
        filter: drop-shadow(0 0 3px #777);
    }

    &:active {
        filter: drop-shadow(0 0 3px blue);

    }
`;


const CreateContact = (props) => {
  return (
    <AddButton onClick={props.createContactButtonHandler}>
      <FontAwesomeIcon icon={faPlusSquare} style={{width: "3rem", height: '3rem', color: '#4286f4'}}/>
    </AddButton>
  )
}

export default CreateContact;
