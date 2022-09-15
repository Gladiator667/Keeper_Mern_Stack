import React, {useState} from 'react';
import {Card, Button, Container, Form} from 'react-bootstrap';

const Createnote = (props) => {
  const [heading, setTitle] = useState("");
  const [content, setBody] = useState("");
  const userId = props.userId;
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(heading, content);
    const response = await fetch('/api/createnote', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({heading, content, userId})
    })
    await response.json();
    await props.onAdd();
    setTitle("");
    setBody("");
  }

  return (
    <Container className="d-flex justify-content-center mt-3">
    <Card style={{borderColor: "#f58413",
                  minWidth: "500px",
                  }}>
    <Card.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2" id='name'>
          <Form.Control type="text" placeholder='Title' value={heading} onChange={(e) => {setTitle(e.target.value)}} required />
        </Form.Group>
        <Form.Group className="mb-4" id='name'>
          <Form.Control as="textarea" placeholder='Body' value={content} onChange={(e) => {setBody(e.target.value)}} required style={{ height: '100px' }}/>
        </Form.Group>
          <Button style={{float: "right", backgroundColor: "#f58413", borderColor: "#f58413"}} type="submit">Add</Button>
        </Form>
    </Card.Body>
    </Card>
    </Container>
  )
}

export default Createnote;