import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FontAwesome from "react-fontawesome";

export default function Footer(props) {
  return (
    <footer style={{ position: "fixed", bottom: "0", width:"inherit", backgroundColor:"white"}}>
      <Container fluid={true}>
        <Row className="border-top justify-content-center">
          <Col className="p-0 d-flex justify-content-center align-items-center" md={4}>
            <FontAwesome name="facebook-square" className="px-4" size="2x" />
            <FontAwesome name="twitter-square" className="px-4" size="2x" />
            <FontAwesome name="instagram" className="px-4" size="2x" />
            <FontAwesome name="google-plus-square" className="px-4" size="2x" />
            <span className="px-4 py-2" style={{ minWidth: "max-content" }}>&copy; Created by Prasad Dighe</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
