import React , {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login ({ onLogin })  {

    const nav = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch ( 'http://localhost:9000/login', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ username, password})
          });
          const data = await response.json();
          if(response.ok) {
            onLogin(data.token, data.username);
            console.log(data.token)
            alert('Login Sucess!');
              
              setUsername('');
              setPassword('');
              nav("/Home")
              
              
          } else {
              alert('Login Failed! Invaild Username or Password')
          }
        }catch(error) {
          console.log('Login error:' , error);
          alert('Login Failed');
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
     
      <h2>Login</h2>
      <br/>
      <Form >
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
      <Button variant='primary' onClick={login}>Login</Button>
  
      </Form>
     
      </div>





    )
}
export default Login;