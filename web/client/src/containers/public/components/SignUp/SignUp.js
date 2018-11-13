import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIAuthenticateControllers from './../../../../controllers/API/authenticate';
import BaseControllers from '../../../../controllers/Base';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signUpData: {
                username: '',
                password: '',
                confirmPassword: '',
                age: '',
                tel: '',
                email: '',
            },
            isChecked: false,
            errors: {}
        }

        this.baseCtrl = new BaseControllers();
        this.apiCtrl = new APIAuthenticateControllers();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onClick = () => {
        this.props.history.push("/sign-in");
    }

    async onSubmit(event) {
        event.preventDefault();
        var { username, password, confirmPassword, age, tel, email } = this.state.signUpData;
        var errors = '';

        if (username) {
            errors = 'Username already exist';
        }

        if (confirmPassword !== password) {
            errors = 'Password is different';
        }

        if (age < 13) {
            errors = 'You must older than 12';
        }

        if (email) {
            errors = 'Email already exist';
        }

        if (tel) {
            errors = 'Telephone number already exist';
        }

        if (!errors) {
            var signUp = this.apiCtrl.signUp(this.state.signUpData);
            await signUp.then((val) => {
                if (val.success) {
                    window.location = "/sign-in";
                    return true;
                } else {
                    errors = "Sign up failed!";
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

        let signUpData = this.state.signUpData;
        signUpData[name] = value;

        this.setState({
            signUpData: signUpData
        })
    }

    onChangeCheckbox = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.checked;

        this.setState({
            [name] : value
        })
    }

    render() {
        var { username, password, confirmPassword, age, tel, email } = this.state.signUpData;
        var { isChecked } = this.state;
        console.log(isChecked)
        return (
            <div>
                <div className="panel panel-success">
                    <div className="panel-heading text-center">
                        <h2 className="panel-title">Sign up</h2>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <label>Username</label>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="username"
                                    className='form-control'
                                    placeholder="Insert username"
                                    value={username}
                                    onChange={this.onChange} />
                            </div>
                            <br />
                            <label>Password</label>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Insert password"
                                    value={password}
                                    onChange={this.onChange} />
                            </div>
                            <br />
                            <label>Confirm password</label>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={this.onChange} />
                            </div>
                            <br />
                            <label>Age</label>
                            <div className="form-group">
                                <input
                                    type="number"
                                    name="age"
                                    className="form-control"
                                    placeholder="Insert your age"
                                    min={"8"}
                                    max={"100"}
                                    value={age}
                                    onChange={this.onChange} />
                            </div>
                            <br />
                            <label>Tel</label>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="tel"
                                    className="form-control"
                                    placeholder="Input telephone number"
                                    value={tel}
                                    onChange={this.onChange} />
                            </div>
                            <br />
                            <label>Email</label>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Input email address"
                                    value={email}
                                    onChange={this.onChange} />
                            </div>
                            <br />
                            <div className="checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="isChecked"
                                        value={isChecked}
                                        onChange={this.onChangeCheckbox} />
                                    By checking this box, you will also agree with our
                                    &nbsp;
                                        <Link to={"/terms-of-use"}>
                                        Terms of use
                                        </Link>
                                    &nbsp;
                                    and
                                    &nbsp;
                                        <Link to={"/privacy"}>
                                        Privacy
                                        </Link>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={this.onSubmit}
                                disabled={isChecked ? false : true}
                            >
                                Submit
                            </button>
                            &nbsp;
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onClick}
                            >
                                Back
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
