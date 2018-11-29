import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIAuthenticateControllers from './../../../../controllers/API/authenticate';
import BaseControllers from '../../../../controllers/Base';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSigningIn: false,
      signInData: {
        username: '',
        password: ''
      },
      errors: {}
    }

    this.baseCtrl = new BaseControllers();
    this.apiAuthCtrl = new APIAuthenticateControllers();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onClick = () => {
    this.props.history.push("/");
  }

  onSubmit(event) {
    event.preventDefault();

    const { signInData } = this.state;
    var errors = '';

    if (!signInData.username || !signInData.password) {
      errors = 'Wrong username or password!';
    }

    if (!errors) {
      var signIn = this.apiAuthCtrl.signIn(signInData);
      signIn.then((val) => {
        if (val.success) {
          this.props.history.push('/');
          return true;
        } else {
          errors = "Sign in failed!"
        }
      })
    }

    this.setState({
      errors: errors
    })
  }

  onChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    let signInData = this.state.signInData;
    signInData[name] = value;

    this.setState({
      signInData: signInData
    })
  }

  render() {
    var { username, password } = this.state.signInData;
    
    return (
      <div>
        <div className="panel panel-primary">
          <div className="panel-heading text-center">
            <h2 className="panel-title">Sign in</h2>
          </div>
          <div className="panel-body">
            <form onSubmit={(event) => this.onSubmit(event)}>
              <div className="form-group">
                <label>Username </label><br />
                <input
                  type="text"
                  name="username"
                  className='form-control form-control-lg'
                  placeholder="Input username"
                  onChange={this.onChange}
                  value={username} />
                <br />
                <label>Password </label><br />
                <input
                  type="password"
                  name="password"
                  className='form-control form-control-lg'
                  placeholder="Input password"
                  onChange={this.onChange}
                  value={password} />
                <p>
                  Didn't have an account yet?
                  &nbsp;
                  <Link to={"/sign-up"}>
                    Sign up
                  </Link>
                </p>
                <br />
                <div className="text-right">
                  <button type="submit" onClick={this.onSubmit} className="btn btn-primary">Submit</button>
                  &nbsp;
                  <button
                    type="button"
                    className="btn btn-danger btn-back"
                    onClick={this.onClick}
                  >
                    Back
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
