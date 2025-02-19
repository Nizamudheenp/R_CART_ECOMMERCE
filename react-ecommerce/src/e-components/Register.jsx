import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, SetUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    try {
      const response = axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, { username, email, password })  //post register
      console.log(response);
      navigate('/login')

    } catch (error) {
      console.log('registration failed', error);

    }
  }
  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/login')
  }


  return (
    <div>
      <Form style={{ padding: "20px" }}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="username"
            onChange={(e) => SetUsername(e.target.value)}
            value={username}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleRegister}>
          register
        </Button>
        <Form.Label style={{ marginLeft: "50px" }}>already  have an account?</Form.Label>
        <Button style={{ marginLeft: "15px", fontSize: "13px" }} variant="primary" type="submit" onClick={handleLogin}>
          sign in
        </Button>
      </Form>
    </div>
  )
}

export default Register