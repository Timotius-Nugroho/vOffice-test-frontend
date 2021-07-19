import { useState } from "react";
import styles from "./Login.module.css";
import {
  Button,
  Container,
  Form,
  Image,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { ExclamationDiamond } from "react-bootstrap-icons";
import axiosApiIntances from "../../../utils/axios";

function Login(props) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState([false, "success", ""]);

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axiosApiIntances
      .post("admin/login", { password })
      .then((res) => {
        setIsLoading(false);
        localStorage.setItem("token", res.data.data);
        setShowAlert([true, "success", res.data.msg]);
        setTimeout(() => {
          setShowAlert([false, "", ""]);
          props.history.push(`/admin`);
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
      <Container fluid>
        <Row>
          <Col
            className={`${styles.breakPoints} text-center p-5`}
            style={{ backgroundColor: "#2fb5bf", height: "600px" }}
          >
            <ExclamationDiamond className={`${styles.logo} mt-5 pt-5`} />
            <h1 className={`${styles.mainTitle} mt-3`}>Admin area</h1>
          </Col>
          <Col md={5} className="p-4">
            <Image
              src="logo_login.jpg"
              alt="Ruangguru Logo"
              className={`${styles.imgLogo} mt-5 mb-5 pt-4`}
            />
            <Form onSubmit={handleLogin} className={styles.semiTitle}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  required
                />
              </Form.Group>
              <p className={styles.semi}>The password is "admin"</p>
              <Button
                variant="primary"
                type="submit"
                className={`${styles.buttonLogin} mt-5 mb-4`}
              >
                {isLoading ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : (
                  "Login"
                )}
              </Button>
              {showAlert[0] ? (
                <Alert className="text-center" variant={showAlert[1]}>
                  <h6>{showAlert[2]}</h6>
                </Alert>
              ) : (
                ""
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
