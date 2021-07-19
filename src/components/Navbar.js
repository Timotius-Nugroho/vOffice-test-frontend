import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class NavBar extends Component {
  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  render() {
    return (
      <>
        <Link to="/chat">Chat</Link> | <Link to="/counter">Counter</Link> |{" "}
        <button onClick={this.handleLogout}>Logout</button>
      </>
    );
  }
}

export default withRouter(NavBar);
