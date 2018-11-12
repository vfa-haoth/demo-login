import React, { Component } from 'react';
import SignIn from '../../components/SignIn/SignIn';

class SignInPage extends Component {
  render() {
    return (
        <div>
          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <SignIn history={this.props.history}/>
            </div>
          </div>
        </div>
    );
  }
}

export default SignInPage;
