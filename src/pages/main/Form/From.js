/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import styles from "./Form.module.css";
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
import axiosApiIntances from "../../../utils/axios";
import axios from "axios";

function FormInput(props) {
  const query = new URLSearchParams(props.location.search);
  const userId = query.get("userId");
  const [userName, setUserName] = useState("_");
  const [deliveryAddr, setDeliveryAddr] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState([false, "success", ""]);

  useEffect(() => {
    axios
      .get(
        `https://us-central1-silicon-airlock-153323.cloudfunctions.net/rg-package-dummy?userId=${userId}`
      )
      .then((res) => {
        setUserName(res.data.user.userName);
      })
      .catch((err) => {
        props.history.push(`/404`);
      });
  }, []);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const setData = {
      id: userId,
      delivery_address: deliveryAddr,
      contact_number: contactNumber,
      contact_person: contactPerson,
    };
    axiosApiIntances
      .post("user", setData)
      .then((res) => {
        setShowAlert([true, "success", res.data.msg]);
        setTimeout(() => {
          setShowAlert([false, "", ""]);
          setIsLoading(false);
          window.location.href = "https://www.ruangguru.com/";
        }, 2000);
      })
      .catch((err) => {
        props.history.push("/403");
      });
  };

  return (
    <>
      <Container>
        <Row
          className="mt-3 mb-3 shadow"
          style={{ backgroundColor: "#2fb5bf", borderRadius: "8px" }}
        >
          <Col md={2}>
            <Image
              src="logo_login.jpg"
              alt="Ruangguru Logo"
              className={styles.imgLogo}
            />
          </Col>
          <Col className="ms-2 p-1">
            <h1 className="mt-2">
              Hey, congrats, there's a prize waiting for you!
            </h1>
            <h5 className={styles.semi}>
              please fill in the form below to claim your prize!
            </h5>
          </Col>
        </Row>
        <Row className={`${styles.body} p-4 mb-3`}>
          <Col>
            <Form onSubmit={handleSubmit} className={styles.semiTitle}>
              <h4>
                Hey <strong>{userName}</strong>, make sure to fill data
                correctly
              </h4>
              {showAlert[0] ? (
                <Alert className="text-center mt-2 mb-2" variant={showAlert[1]}>
                  <h6>{showAlert[2]}</h6>
                </Alert>
              ) : (
                ""
              )}
              <Form.Group className="mb-3 mt-4">
                <Form.Label>User ID</Form.Label>
                <Form.Control type="text" value={userId} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>User delivery address</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => {
                    setDeliveryAddr(event.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact number</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => {
                    setContactNumber(event.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact person name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => {
                    setContactPerson(event.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className={`${styles.buttonSubmit} mt-5`}
              >
                {isLoading ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FormInput;
