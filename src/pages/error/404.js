import { Image, Container } from "react-bootstrap";

function Error404(props) {
  return (
    <>
      <Container fluid>
        <div className="text-center">
          <Image src="404.gif" alt="Page not found" style={{ width: "60%" }} />
        </div>
      </Container>
    </>
  );
}

export default Error404;
