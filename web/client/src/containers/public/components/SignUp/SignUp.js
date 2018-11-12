import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            age: '',
            tel: '',
            email: '',
            isChecked: false,
            errors: {} 
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                code: nextProps.code,
                name: nextProps.name,
                price: nextProps.price,
                status: nextProps.status,
                errors: nextProps.errors
            })
        }
    }

    onClick = () => {
        this.props.history.push("/sign-in");
    }

    onSubmit = (event) => {
        event.preventDefault();
        var { username, password, age, tel, email, isChecked } = this.state;
        var account = {
            username: username,
            password: password,
            age: age,
            tel: tel,
            email: email,
            isChecked: isChecked
        }

        this.props.onSubmit(account, this.props.history);
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value
        })
    }

    render() {
        var { username, password, age, tel, email, isChecked } = this.state;
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
                                    value={password}
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
