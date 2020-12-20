import "./App.scss";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Footer from "./Component/Footer";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <Router forceRefresh>
      <Container className="p-0" fluid={true}>
        <Navbar
          className="border-bottom"
          expand="lg"
          variant="dark"
          style={{ backgroundColor: "#1976d2" }}
        >
          <Navbar.Brand
            onClick={() => {
              new HomePage().reload();
            }}
          >
            File Manager
          </Navbar.Brand>
          <Navbar.Toggle className="border-0" aria-controls="navbar-toggle" />
          <Navbar.Collapse id="navbar-toggle">
            <Nav className="ml-auto">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/"
                exact
              >
                Home
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path={["/"]} exact component={HomePage} />
        </Switch>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
