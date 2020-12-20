import axios from "axios";
import React from "react";

class APICalls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      API_URL: "http://localhost:5000",
    };
  }

  getAllFiles = async function getAllFiles() {
    return axios
      .get(`${this.state.API_URL}/getAllFiles`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err)
      });
  };

  findFile = async function findFile(fileName) {
    return axios
      .get(`${this.state.API_URL}/findFile/${fileName}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  deleteFile = async function deleteFile(folderName,fileName) {
    return axios
      .delete(`${this.state.API_URL}/deleteFile/${folderName}/${fileName}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new APICalls();
