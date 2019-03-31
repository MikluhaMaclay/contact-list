import React from "react";
import { Collapse, Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const SortButton = styled.div`
  cursor: pointer;
  filter: drop-shadow(0 0 1px #777);

  &:hover {
    filter: drop-shadow(0 0 3px #777);
  }

  &:active {
    filter: drop-shadow(0 0 3px blue);
  }
`;

function NavBar(props) {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Contacts</NavbarBrand>
        <Collapse isOpen navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <SortButton onClick={props.sortHandler}>
                <FontAwesomeIcon
                  icon={faSort}
                  style={{ width: "3rem", height: "3rem", color: "#4286f4" }}
                />
              </SortButton>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
