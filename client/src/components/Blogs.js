import React from 'react'
import {Card, Button} from 'react-bootstrap';

const Blogs = (props) => {
  
  function handleDelete() {
    props.onDelete(props.id);
  }

    return (
        <Card style={{ width: "25%", margin: "3%", float: "left", boxShadow: "0 2px 5px #ccc"}}>
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.body}</Card.Text>
            <Button variant="danger" style={{ float: "right"}} onClick={handleDelete}>Delete</Button>
          </Card.Body>
        </Card>
      );
}

export default Blogs