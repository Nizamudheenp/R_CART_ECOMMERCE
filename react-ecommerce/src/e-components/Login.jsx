import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, { email, password })  //post
      const token = response.data.token;

      localStorage.setItem('token', token)

      const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/userDashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem('isAdmin', userResponse.data.isAdmin);

      navigate('/')

    } catch (error) {
      console.log('login failed', error);

    }
  }
  const handleRegister = (e) => {
    e.preventDefault()
    navigate('/register')
  }

  return (
    <div>
      <Form style={{ padding: "20px" }}>
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
        <Button variant="primary" type="submit" onClick={handleLogin}>
          login
        </Button>
        <Form.Label style={{ marginLeft: "50px" }}>dont you have account?</Form.Label>
        <Button style={{ marginLeft: "15px", fontSize: "13px" }} variant="primary" type="submit" onClick={handleRegister}>
          sign up
        </Button>
      </Form>
    </div>
  )
}

export default Login