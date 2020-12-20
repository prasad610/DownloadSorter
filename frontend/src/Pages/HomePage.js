import React, { Component } from "react";

import CardComponent from "../Component/CardComponent";
import apicalls from "../Component/APICalls";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFile: "",
      data: {},
      component: undefined,
    };
    this.getAllFiles();
  }

  getAllFiles = () => {
    apicalls
      .getAllFiles()
      .then((res) => {
        if (res.status === 200) {
          this.setState(
            {
              data: res.data,
            },
            () => {
              console.log(this.state.data);
              this.setState({ component: this.cardComponents() });
              this.forceUpdate();
            }
          );
        } else {
          console.log("ERROR : ", res);
        }
      })
      .catch((err) => {
        console.log("ERROR : ", err);
      });
  };

  getFile = () => {
    var fileName = this.state.searchFile;

    if (fileName === "") {
      this.getAllFiles();
      return;
    }

    apicalls
      .findFile(fileName)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ data: res.data },() => {
              console.log(this.state.data);
              this.setState({ component: this.cardComponents() });
            });
        } else {
          console.log("ERROR : ", res);
        }
      })
      .catch((err) => {
        console.log("ERROR : ", err);
      });
  };

  cardComponents = () => {
    var cards = [];
    var counter = 1;
    for (var entry in this.state.data) {
      cards.push(entry);
    }
    var component = cards.map((entry, index) => {
      return (
        <CardComponent
          index={counter}
          folderName={entry}
          files={this.state.data[entry]}
          key={counter++}
        />
      );
    });
    // this.setState({component:component});
    return component;
  };

  reload() {
    this.getAllFiles();
  }

  render() {
    return (
      <div id="homeDiv">
        <input
          type="text"
          placeholder="Search file"
          onChange={(event) => {
            this.setState({ searchFile: event.target.value });
          }}
        ></input>
        <Button
          className="fa fa-search"
          onClick={() => {
            this.getFile();
          }}
        ></Button>
        <Accordion>{this.cardComponents()}</Accordion>
      </div>
    );
  }
}

export default HomePage;
