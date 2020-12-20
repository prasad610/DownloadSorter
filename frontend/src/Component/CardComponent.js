import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import FileItem from './FileItem';

class CardComponent extends Component {
    constructor(props){
        super(props);
        this.state={data : this.files()};

        console.log("this.state",this.state)
    }
    files(){
        // var files = this.props.files.join("\n");
        var temp = this.props.files.map((fileName,index)=>{
            return <FileItem key={index} fileName={fileName} folderName={this.props.folderName}/>    
        })
        return temp
        // return files;
    }
    render() {
        return (
            <Card >
                <Accordion.Toggle eventKey={this.props.index}>
                    {this.props.folderName}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={this.props.index}>
                    <Card.Body>{this.state.data}</Card.Body>
                </Accordion.Collapse>
            </Card>
        );  
    }
}

export default CardComponent;


