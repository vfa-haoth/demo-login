import React, { Component } from 'react';
import SignIn from '../../components/SignIn/SignIn';

class SignInPage extends Component {
  render() {
    return (
        <div>
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              <SignIn history={this.props.history}/>
            </div>
          </div>
        </div>
    );
  }
}

export default SignInPage;
