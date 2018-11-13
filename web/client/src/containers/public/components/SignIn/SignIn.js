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
    this.apiCtrl = new APIAuthenticateControllers();
    this.onSubmit = this.onSubmit.bind(this);

    if ( this.apiCtrl.verifySignIn().success) {
      this.props.history.push("/");
    }
  }

  showSignInButton = () => {
    this.setState({isSigningIn : (this.state.isSigningIn ? false : true)})
  }

  onClick = () => {
    this.props.history.push("/");
  }

  async onSubmit (event) {
    event.preventDefault();

    const {signInData} = this.state;
    var error = '';

    if (!signInData.username || !signInData.password) {
      error = 'Wrong username or password!';
    }

    if (!error) {
      var signIn = this.apiCtrl.signIn(signInData);
      await signIn.then( (val) => {
        if ( val.success ) {
          window.location = "/";
          return true;
        } else {
          error = "Sign in failed!"
        }
      })
    }

    this.setState({
      error : error
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value
    })
  }

  render() {
    var { username, password } = this.state;
    return (
      <div>
        <div className="panel panel-primary">
          <div className="panel-heading text-center">
            <h2 className="panel-title">Sign in</h2>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
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
                <div>
                  <button type="submit" className="btn btn-primary">Submit</button>
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
