import React from "react";
import Navbar from "../../../components/Navbar";
import { Button, Container } from "react-bootstrap";

// WITHOUT REDUX ===========================================================================
function Counter() {
  return (
    <>
      <Container className="text-center">
        <Navbar />
        <h1>Counter</h1>
        <hr />
        <h3>0</h3>
        <Button variant="primary">-</Button>
        <Button variant="secondary" className="mx-2">
          RESET
        </Button>
        <Button variant="primary">+</Button>
      </Container>
    </>
  );
}

export default Counter;

// WITH REDUX ===========================================================================
// function Counter() {
//   return (
//     <>
//       <Container className="text-center">
//         <Navbar />
//         <h1>Counter</h1>
//         <hr />
//         <h3>0</h3>
//         <Button variant="primary">-</Button>
//         <Button variant="secondary" className="mx-2">
//           RESET
//         </Button>
//         <Button variant="primary">+</Button>
//       </Container>
//     </>
//   );
// }

// export default Counter;
