import React, { Component } from "react";

import ResetPassword from "../components/ResetPassword";

class ResetPasswordPage extends Component {
  static getInitialProps({ query }) {
    return { type: query.type };
  }

  render() {
    return <ResetPassword {...this.props} />;
  }
}

export default ResetPasswordPage;
