import { useState } from "react";
import styles from "./Login.module.css";
import {
  Button,
  Container,
  Form,
  Card,
  Spinner,
  Alert,
  Image,
} from "react-bootstrap";
import axiosApiIntances from "../../../utils/axios";

function Login(props) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState([false, "", ""]);

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axiosApiIntances
      .post("login", { client_email: email })
      .then((res) => {
        setIsLoading(false);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("email", res.data.data.cilentEmail);
        setShowAlert([true, "success", res.data.msg]);
        setTimeout(() => {
          setShowAlert([false, "", ""]);
          props.history.push(`/dashboard`);
        }, 1000);
      })
      .catch((err) => {
        setIsLoading(false);
        setShowAlert([
          true,
          "danger",
          err.response.data ? err.response.data.msg : "unkown error!",
        ]);
        setTimeout(() => {
          setShowAlert([false, "", ""]);
        }, 2000);
      });
  };

  return (
    <>
      <Container>
        <Card className={`${styles.cardCustom} mt-5 mx-auto p-3 shadow`}>
          <Card.Body>
            <Form onSubmit={handleLogin}>
              <div className="text-center">
                <Image
                  src="mainLogo.jpg"
                  alt="Logo"
                  className={styles.imgLogo}
                />
              </div>
              <div className={`${styles.title} mt-3 mb-3`}>Masuk disini</div>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Alamat Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="masukan email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Form.Group>
              <div className={styles.mini}>
                Email demo : antono@any.com atau samiro@any.com
              </div>
              <Button
                variant="danger"
                type="submit"
                className={`${styles.btnCustom} mt-4 mb-3`}
              >
                {isLoading ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : (
                  "Masuk"
                )}
              </Button>
              {showAlert[0] ? (
                <Alert className="text-center" variant={showAlert[1]}>
                  {showAlert[2]}
                </Alert>
              ) : (
                ""
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Login;
