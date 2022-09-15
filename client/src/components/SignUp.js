import React, {useState, useContext} from "react";
import {Card, Form, Button, Alert, Container} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import { Usercontext } from "./App";


function SignUp(){
    const {dispatch} = useContext(Usercontext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password, confirmPassword})
        })
        const data = await response.json();

        if(data.message){
            setError(data.message);
        }

        if(data.user){
            dispatch({type: "USER", payload: true})
            console.log(data.user);
            navigate("/dashboard");
        }
    }
        

    return(<Container className="d-flex mt-3 justify-content-center" style={{minHeight: "100vh"}}>
    <div className="w-100" style={{maxWidth: "400px"}}>
    <Card style={{boxShadow: "0 1px 5px rgb(138, 137, 137)"}}>
        <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
            {error && show && <Alert variant='danger' onClose={() => setShow(false)} dismissible>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" id='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder='Name' onChange={(event) => {setName(event.target.value)}} required />
                </Form.Group>
                <Form.Group className="mb-4" id='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder='Email ID' onChange={(event) => {setEmail(event.target.value)}} required/>
                </Form.Group>
                <Form.Group className="mb-4" id='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder='Password' onChange={(event) => {setPassword(event.target.value)}} required />
                </Form.Group>
                <Form.Group className="mb-4" id='cPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder='Confirm Password' onChange={(event) => {setConfirmPassword(event.target.value)}} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">Sign Up</Button> 
            </Form>
        </Card.Body>
    </Card>
    </div>
    </Container>
)};

export default SignUp;