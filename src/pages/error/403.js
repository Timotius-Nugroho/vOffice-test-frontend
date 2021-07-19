import { Image, Container } from "react-bootstrap";

function Error403(props) {
  return (
    <>
      <Container className="text-center mt-5" fluid>
        <h2 className="p-4">You have already filled out the form.</h2>
        <div>
          <Image src="403.gif" alt="Forbidden" style={{ width: "60%" }} />
        </div>
      </Container>
    </>
  );
}

export default Error403;
