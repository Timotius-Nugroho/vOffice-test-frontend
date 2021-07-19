import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";

function Login(props) {
  const [username, setUsername] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem("token", username);
    props.history.push("/chat");
  };

  const changeText = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <Container>
        <Card className="mt-5 mx-auto" style={{ width: "25rem" }}>
          <Card.Body>
            <h1>Login</h1>
            <hr />
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(event) => changeText(event)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Login;
