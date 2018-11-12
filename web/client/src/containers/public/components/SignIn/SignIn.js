import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actions from './../../actions/index';
import { connect } from 'react-redux';
import classnames from 'classnames';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {}
    }
  }

  onClick = () => {
    this.props.history.push("/");
  }

  onSubmit = (event) => {
    event.preventDefault();
    var user = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.onSubmit(user.username, user.password);
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
    var { username, password, errors } = this.state;
    return (
      <div>
        <div className="panel panel-primary">
          <div className="panel-heading text-center">
            <h2 className="panel-title">Sign in</h2>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Username: </label><br />
                <input
                  type="text"
                  name="username"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.username
                  })}
                  placeholder="Input username"
                  onChange={this.onChange}
                  value={username} />
                <br />
                <label>Password: </label><br />
                <input
                  type="password"
                  name="password"
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password
                  })}
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

const mapStateToProps = (state) => {
  return {
    errors : state.errors
  }
}

const mapDipatchToProps = (dispatch, props) => {
  return {
    onSubmit: (username, password) => {
      dispatch(actions.signIn(username, password));
    }
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(SignIn);
