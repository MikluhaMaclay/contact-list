import React from "react";
import { Container } from "reactstrap";
import ContactList from "./Components/ContactList";

const App = () => {
  return (
    <div className="App">
      <Container>
        <ContactList />
      </Container>
    </div>
  );
};

export default App;
