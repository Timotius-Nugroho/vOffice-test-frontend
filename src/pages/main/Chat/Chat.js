import { useState } from "react";
import Navbar from "../../../components/Navbar";
import styles from "./Chat.module.css";
import { Container, Form, Row, Col } from "react-bootstrap";

function Chat(props) {
  // const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSelectRoom = (event) => {
    console.log(event.target.value);
  };

  const handleChangeText = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    console.log("Send Message :", message);
  };

  return (
    <Container className="text-center">
      <Navbar />
      <h1>Chat App</h1>
      <hr />
      <Form>
        <Form.Group>
          <Form.Control
            as="select"
            size="lg"
            onChange={(event) => handleSelectRoom(event)}
          >
            <option value="">Pilih Room ...</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="js">JS</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <hr />
      <Row>
        <Col sm={2}>
          <div className={styles.chat}>
            <div className={styles.chatWindow}>
              <p className={styles.room}>User 1</p>
              <hr />
              <p className={styles.room}>User 2</p>
              <hr />
            </div>
          </div>
        </Col>
        <Col sm={10}>
          <div className={styles.chat}>
            <div className={styles.chatWindow}>
              <div className={styles.output}>
                <p>
                  <strong>Bagus : </strong>
                  Hai !
                </p>
              </div>
            </div>
            <input
              className={styles.inputMessage}
              onChange={(event) => handleChangeText(event)}
              type="text"
              placeholder="Message"
            />
            <button onClick={handleSendMessage} className={styles.btnSubmit}>
              Send
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
