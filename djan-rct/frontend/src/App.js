import './App.css';
import React from 'react';
import { useState, /*useEffect*/ } from 'react';
import axios from 'axios';
import Main from './components/Main';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true; // Make sure to include this line


const client = axios.create({
  baseURL: "http://129.153.90.80:8000",
  withCredentials: true,
  headers: {
    "X-CSRFToken": getCookie("csrftoken"),
  },
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   client.get("/saveuser/user")
  //   .then(function(res) {
  //     setCurrentUser(true);
  //   })
  //   .catch(function(error) {
  //     setCurrentUser(false);
  //   });
  // }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    const data = {
      email: email,
      username: username,
      password: password,
    };
    if(password.length < 8) {
      alert('Choose another password, minimum 8 characters');
      return;
    }
    client.post(
      "/saveuser/register",
      data,
      { withCredentials: true }
    ).then(function(res) {
      client.post(
        "/saveuser/login",
        data,
        { withCredentials: true }
      ).then(function(res) {
        setUsername(res.data.username); 
        setCurrentUser(true);
      })
    });
  }
  
  function submitLogin(e) {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    client.post(
      "/saveuser/login",
      data,
      { withCredentials: true }
    ).then(function (res) {
      setUsername(res.data.username);  
      setCurrentUser(true);
    })
    .catch(function(error){
      if (error.response) {
        alert("Incorrect email or password. Please try again.");
      } 
    });
  }
  
  function submitLogout(e) {
    e.preventDefault();
    const data = {}; // You may need to send some data in the request
    client.post(
      "/saveuser/logout",
      data,
      {
        withCredentials: true,
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
      }
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  if (currentUser) {
    return (
      <div>
       
        <Navbar bg="dark" variant="dark">
          <Container>
          <img width="50" height="50" src="https://img.icons8.com/plasticine/100/cookie.png" alt="cookie"/>
            <Navbar.Brand className='cookieTitle'>Cookie Clicker</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant="light">Log out</Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Main username={username} />
        </div>
    );
  }
  return (
    <div>
    <Navbar bg="dark" variant="dark">
      <Container>
      <img width="50" height="50" src="https://img.icons8.com/plasticine/100/cookie.png" alt="cookie"/>
        <Navbar.Brand className='cookieTitle'>Cookie Clicker</Navbar.Brand>        
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {
      registrationToggle ? (
        <div className="center">
          <Form onSubmit={e => submitRegistration(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>        
      ) : (
        <div className="center">
          <Form onSubmit={e => submitLogin(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )
    }
    </div>
  );
}

export default App;
