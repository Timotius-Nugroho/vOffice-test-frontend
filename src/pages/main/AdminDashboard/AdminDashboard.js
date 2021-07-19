/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import { Button, Container, Image, Row, Col } from "react-bootstrap";
import { Power } from "react-bootstrap-icons";
import axiosApiIntances from "../../../utils/axios";

function AdminDashboard(props) {
  const [userSubmission, setUserSubmission] = useState([]);

  const getDataSubmission = () => {
    axiosApiIntances
      .get("admin/user-data")
      .then((res) => {
        setUserSubmission(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateStatus = (userId, status) => {
    axiosApiIntances
      .patch(`admin/update-status/${userId}`, {
        submission_status: status,
      })
      .then((res) => {
        getDataSubmission();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/");
  };

  useEffect(() => {
    getDataSubmission();
  }, []);

  return (
    <>
      <nav className={`${styles.navbar} sticky-top`}>
        <Container>
          <div className="d-flex justify-content-between">
            <div>
              <Image
                src="logo_login.jpg"
                alt="Ruangguru Logo"
                className={styles.imgLogo}
              />
            </div>
            <div className={`${styles.breakPoints} text-center`}>
              <h2 className="mt-2" style={{ color: "white" }}>
                Ruangguru’s ops team
              </h2>
            </div>
            <div className="text-center mt-2">
              <Power
                className={styles.buttonPower}
                onClick={() => {
                  handleLogout();
                }}
              />
              <div className={styles.logoutDesc}>log out</div>
            </div>
          </div>
        </Container>
      </nav>
      <Container className="mb-5">
        <h1 className="mt-3 mb-3">User submission</h1>
        {userSubmission.length === 0 ? (
          <h2 className="text-center">No Data</h2>
        ) : (
          userSubmission.map((item, index) => {
            return (
              <Row key={index} className={`${styles.submissionInfo} mb-3`}>
                <Col md={3}>
                  <div>
                    <strong>ID</strong>{" "}
                    <span className={styles.mini}>{item.id}</span>
                  </div>
                  <div>
                    <strong>Contact Person</strong>{" "}
                    <span className={styles.mini}>{item.contact_person}</span>
                  </div>
                </Col>
                <Col md={4} className="overflow-auto">
                  <strong>Delivery Address</strong>
                  <div className={styles.mini}>{item.delivery_address}</div>
                </Col>
                <Col md={3} className="overflow-auto">
                  <strong>Possible prizes</strong>
                  <div className={styles.mini}>
                    {item.prize.map((item, index) => {
                      return <span key={index}>{item.name}, </span>;
                    })}
                  </div>
                </Col>
                <Col md={2}>
                  {item.submission_status !== "CREATED" ? (
                    <div className="mt-2">
                      <Button
                        variant="warning"
                        type="submit"
                        className={styles.buttonAction}
                      >
                        {item.submission_status}
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="mt-1 mb-1">
                        <Button
                          variant="success"
                          type="submit"
                          className={styles.buttonAction}
                          onClick={() => {
                            handleUpdateStatus(item.id, "DELIVERY");
                          }}
                        >
                          Delivery
                        </Button>
                      </div>
                      <div>
                        <Button
                          variant="danger"
                          type="submit"
                          className={styles.buttonAction}
                          onClick={() => {
                            handleUpdateStatus(item.id, "REJECTED");
                          }}
                        >
                          Rejected
                        </Button>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            );
          })
        )}
      </Container>
      <footer className={`${styles.footer} fixed-bottom text-center p-2`}>
        © 2021 Ruangguru. All Rights Reserved
      </footer>
    </>
  );
}

export default AdminDashboard;
