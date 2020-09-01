import React from "react";
import ReactDOM from "react-dom";
import { Header } from "components";
import { ButtonGroup, Button, Container, Jumbotron } from "react-bootstrap";

ReactDOM.render(
  <>
    <Header />
    <Jumbotron>
      <Container className="h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <ButtonGroup size="lg" className="mt-3">
            <Button href="/admin">Admin</Button>
            <Button>Customer</Button>
            <Button>Auth</Button>
          </ButtonGroup>
        </div>
      </Container>
    </Jumbotron>
  </>,
  document.getElementById("header")
);
