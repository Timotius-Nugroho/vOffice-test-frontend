/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import {
  Button,
  Container,
  Image,
  Row,
  Col,
  Modal,
  Spinner,
  Form,
  Alert,
} from "react-bootstrap";
import { Power } from "react-bootstrap-icons";
import axiosApiIntances from "../../../utils/axios";

function AdminDashboard(props) {
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("Loading...");
  const [clientEmail, setClientEmail] = useState("Loading...");
  const [clientCredit, setClientCredit] = useState("/");
  const [listRoom, setListRoom] = useState([]);
  const [history, setHistory] = useState([]);
  const [bookingTime, setBookingTime] = useState("0");
  const [selectedRoom, setSelectedRoom] = useState("0");

  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState([false, "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const getClientInfo = () => {
    axiosApiIntances
      .post("info", { client_email: localStorage.getItem("email") })
      .then((res) => {
        setClientId(res.data.data[0].client_id);
        setClientName(res.data.data[0].client_name);
        setClientEmail(res.data.data[0].client_email);
        setClientCredit(res.data.data[0].client_balance);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getAllRoom = () => {
    axiosApiIntances
      .get("room")
      .then((res) => {
        setListRoom(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getClientHistory = () => {
    axiosApiIntances
      .get(`history/${localStorage.getItem("email")}`)
      .then((res) => {
        setHistory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/");
  };

  const handleOrder = () => {
    setIsLoading(true);
    const setData = {
      client_id: clientId,
      room_id: selectedRoom,
      booking_time: bookingTime,
    };

    axiosApiIntances
      .post("booking", setData)
      .then((res) => {
        setShowAlert([true, "success", res.data.msg]);
      })
      .catch((err) => {
        setShowAlert([true, "danger", err.response.data.msg]);
      })
      .finally(() => {
        setTimeout(() => {
          setShowAlert([false, "", ""]);
          setIsLoading(false);
          setShowModal(false);
          getClientInfo();
          getClientHistory();
        }, 2000);
      });
  };

  useEffect(() => {
    getClientInfo();
    getAllRoom();
    getClientHistory();
  }, []);

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Masukan lama pemakaian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="number"
            placeholder={`Maksimal ${clientCredit} jam`}
            onChange={(event) => {
              setBookingTime(event.target.value);
            }}
            max={"5"}
            min="1"
          />
          {showAlert[0] ? (
            <Alert className="text-center mt-3" variant={showAlert[1]}>
              {showAlert[2]}
            </Alert>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleOrder();
            }}
          >
            {isLoading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              "Selesai"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <nav className={`${styles.navbar} mb-4 sticky-top`}>
        <Container className="d-flex justify-content-between">
          <div>
            <Image
              src="mainLogo.jpg"
              alt="Logo"
              className={`${styles.imgLogo}`}
            />
          </div>
          <div
            onClick={() => {
              handleLogout();
            }}
          >
            <Power className={`${styles.buttonPower} mt-2`} />
          </div>
        </Container>
      </nav>
      <Container>
        <Row className={`${styles.cardCustom} shadow p-3 mb-2`}>
          <Col md={8}>
            <h2>Detail profil</h2>
            <div className={styles.semi}>{clientName}</div>
            <div className={styles.semi}>{clientEmail}</div>
          </Col>
          <Col md={4} className="text-center">
            <h4>Sisa Credit</h4>
            <div className={styles.credit}>{clientCredit}</div>
          </Col>
        </Row>
        <Row className={`${styles.cardCustom} shadow p-3 mb-2`}>
          <h2>List Meeting Room</h2>
          <div className={`${styles.roomCnt} m-2`}>
            {listRoom.length === 0 ? (
              <h3>Loading...</h3>
            ) : (
              listRoom.map((item, index) => {
                return (
                  <Row
                    className={`${styles.cardCustom} shadow p-3 mb-2`}
                    key={index}
                  >
                    <Col className={styles.leftside} md={4}>
                      <h4>Ruang {item.room_name}</h4>
                      <div className={styles.semi}>
                        Kapasitas {item.room_capacity} orang
                      </div>
                      <Button
                        variant="success"
                        className={styles.buttonOrder}
                        onClick={() => {
                          setShowModal(true);
                          setSelectedRoom(item.room_id);
                        }}
                      >
                        Pesan
                      </Button>
                    </Col>
                    <Col>
                      <h4>Fasilitas</h4>
                      <div>
                        {item.facilities.map((item, index) => {
                          return (
                            <Button
                              variant="warning"
                              className="me-2 mb-2"
                              key={index}
                            >
                              <div className={styles.facilitiesName}>
                                {item.facilities_name}
                              </div>
                              <div className={styles.facilitiesQty}>
                                {item.facilities_amount} buah
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </Col>
                  </Row>
                );
              })
            )}
          </div>
        </Row>
        <Row className={`${styles.cardCustom} shadow p-3 mb-2`}>
          <h2>Laporan Penggunaan</h2>
          <div className={`${styles.roomCnt} m-2`}>
            {history.length === 0 ? (
              <h3>Loading...</h3>
            ) : (
              history.map((item, index) => {
                return (
                  <Row
                    className={`${styles.cardCustom} shadow p-3 mb-2`}
                    key={index}
                  >
                    <Col className={styles.leftside} md={4}>
                      <h4>Ruang {item.room_name}</h4>
                      <div className={styles.semi}>
                        Kapasitas {item.room_capacity} orang
                      </div>
                    </Col>
                    <Col>
                      <h4>Detail</h4>
                      <div className={styles.descTitle}>
                        Tanggal pemesanan{" "}
                        <span className={styles.desc}>
                          {item.booking_created_at.split("T")[0]}
                        </span>
                      </div>
                      <div className={styles.descTitle}>
                        Lama pemakaian{" "}
                        <span className={styles.desc}>
                          {item.booking_time} jam
                        </span>
                      </div>
                      <div className={styles.descTitle}>
                        Harga{" "}
                        <span className={styles.desc}>
                          {item.booking_time} kredit
                        </span>
                      </div>
                    </Col>
                  </Row>
                );
              })
            )}
          </div>
        </Row>
      </Container>
      <footer className={`${styles.footer} text-center p-2 mt-3`}>
        © 2021 VOffice. All Rights Reserved
      </footer>
    </>
  );
}

export default AdminDashboard;
