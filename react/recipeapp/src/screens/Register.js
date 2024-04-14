import React , {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Form, Card, Button, Alert} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Register() {

    const nav = useNavigate();

    const [fname, setFirstName] = useState('');
    const [lname, setLastName] = useState('');
    const [email, setEmail]= useState('');
    const [phonenum, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const register = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch ('http://localhost:9000/register', { // fetch a promise wait for it
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({fname, lname, email, phonenum, username, password})
        });
        if (response.ok) {
          alert('User registered sucessfully'); // should not use genarlly use it
          setFirstName('')
          setLastName('');
          setEmail('');
          setPhoneNumber('');
          setUsername('');
          setPassword('');

          nav ("/")
          
  
        } else {
          alert('Failed to register user');
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed');
      }
    };
  
    const loginWrapper = {
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "row",
      margin: "100px",
    }
  
  
    return (
      <div style={loginWrapper}>
      {/*Rigister Form*/}
      <h2>Register</h2>
      <br/>
      <Form >
      <Form.Group>
      <Form.Label>First Name</Form.Label>
      <Form.Control
      type='text'
      placeholder='Enter First Name'
      onChange={e => setFirstName(e.target.value)}></Form.Control> 
  
      </Form.Group>
      <Form.Group>
      <Form.Label>Last Name</Form.Label>
      <Form.Control
      type='text'
      placeholder='Enter Last Name'
      onChange={e => setLastName(e.target.value)}></Form.Control> 
  
      </Form.Group>
      <Form.Group>
      <Form.Label>Email</Form.Label>
      <Form.Control
      type='text'
      placeholder='Enter Email'
      onChange={e => setEmail(e.target.value)}></Form.Control> 
  
      </Form.Group>
      <Form.Group>
        <Form.Label>Phone Number</Form.Label>
        <Form.Control 
        type='text'
        placeholder='Enter Phone'
        onChange={e => setPhoneNumber(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>User Name</Form.Label>
        <Form.Control 
        type='text'
        placeholder='Enter Username'
        onChange={e => setUsername(e.target.value)}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type='password'
        placeholder='Enter Password'
        onChange={e => setPassword(e.target.value)}></Form.Control>
      </Form.Group>
      <br/>
      <Button variant='primary' type='submit' onClick={register}
      >Register</Button>
  
      </Form>
     
      </div>
      
     
    
    );
  }
  
  export default Register;
  
