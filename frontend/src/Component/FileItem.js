import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FontAwesome from "react-fontawesome";
import apicalls from "./APICalls";
import HomePage from "../Pages/HomePage";

class FileItem extends Component {
  constructor(props) {
    super(props);
    this.state={success:false}
  }

  delete = () => {
    apicalls
      .deleteFile(this.props.folderName, this.props.fileName)
      .then((res) => {
        if (res.status === 200) {
          console.log("Success");
          this.setState({success:true})
        //   "2020-06-13": ["rockyou.txt"],
          new HomePage().reload();
        } else {
          console.log("Error : ", res);
        }
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }
  render() {
    return (
      <div>
        <Card>
          <Row className="mx-2 my-2">
            <Col xs={11} lg={11} xl={11} sm={11} md={11}>
              <p className="p-1 my-auto">{this.props.fileName}</p>
            </Col>
            <Col xs={1} lg={1} xl={1} sm={1} md={1} className="my-auto">
              <Button variant="outline-danger" onClick={this.delete} hidden={this.state.success}>
                <FontAwesome name="trash" />
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default FileItem;
