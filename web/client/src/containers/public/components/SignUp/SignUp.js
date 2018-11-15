import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import APIAuthenticateControllers from './../../../../controllers/API/authenticate';
import APIControllers from './../../../../controllers/API/index';
import BaseControllers from '../../../../controllers/Base';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signUpData: {
                username: '',
                password: '',
                age: '',
                tel: '',
                email: '',
            },
            isChecked: false,
            errors: {}
        }

        this.baseCtrl = new BaseControllers();
        this.apiCtrl = new APIControllers();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onClick = () => {
        this.props.history.push("/sign-in");
    }

    onSubmit(event) {
        event.preventDefault();
        console.log("clicked")
        var { signUpData } = this.state;
        var errors = '';

        if(!signUpData.username || !signUpData.password || !signUpData.email){
            errors = "Username, password and email is required!"
        }

        console.log(errors)
        if (!errors) {
            var signUp = this.apiCtrl.saveUser(this.state.signUpData);
            signUp.then((val) => {
                if (val.success) {
                    this.props.history.push("/sign-in");
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
        const value = target.type === 'checkbox' ? target.checked : target.value;

        let signUpData = this.state.signUpData;
        signUpData[name] = value;

        this.setState({
            signUpData: signUpData
        })
    }

    render() {
        var { username, password,  age, tel, email } = this.state.signUpData;
        var { isChecked } = this.state;
        return (
            <div>
                <div className="panel panel-success">
                    <div className="panel-heading text-center">
                        <h2 className="panel-title">Sign up</h2>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={(event) => this.onSubmit(event)}>
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
                            {/* <label>Confirm password</label>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={this.onChange} />
                            </div>
                            <br /> */}
                            <label>Age</label>
                            <div className="form-group">
                                <input
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                                        onChange={this.onChange} />
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
