import React, { Component } from "react";
import Navbar from "../../../components/Navbar";
import { Button, Container } from "react-bootstrap";

// WITHOUT REDUX ===========================================================================
class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }
  increaseCounter = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  decreaseCounter = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };
  resetCounter = () => {
    this.setState({
      count: 0,
    });
  };

  render() {
    const { count } = this.state;
    return (
      <>
        <Container className="text-center">
          <Navbar />
          <h1>Counter</h1>
          <hr />
          <h3>{count}</h3>
          <Button variant="primary" onClick={this.decreaseCounter}>
            -
          </Button>
          <Button
            variant="secondary"
            className="mx-2"
            onClick={this.resetCounter}
          >
            RESET
          </Button>
          <Button variant="primary" onClick={this.increaseCounter}>
            +
          </Button>
        </Container>
      </>
    );
  }
}

export default Counter;

// WITH REDUX ===========================================================================
// import { connect } from "react-redux";
// import {
//   increaseCounter,
//   decreaseCounter,
//   resetCounter,
// } from "../../../redux/action/counter";

// class Counter extends Component {
//   render() {
//     // console.log(this.props);
//     const { count } = this.props.counter;
//     return (
//       <>
//         <Container className="text-center">
//           <Navbar />
//           <h1>Counter</h1>
//           <hr />
//           <h3>{count}</h3>
//           <Button variant="primary" onClick={this.props.decreaseCounter}>
//             -
//           </Button>
//           <Button
//             variant="secondary"
//             className="mx-2"
//             onClick={this.props.resetCounter}
//           >
//             RESET
//           </Button>
//           <Button variant="primary" onClick={this.props.increaseCounter}>
//             +
//           </Button>
//         </Container>
//       </>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   counter: state.counter,
// });

// const mapDispatchToProps = { increaseCounter, decreaseCounter, resetCounter };
// // (null, mapDispatchToProps)
// // (mapStateToProps)
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
