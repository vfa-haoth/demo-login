import React, { Component } from 'react';
import APIAuthenticateControllers from './../../../../controllers/API/authenticate';
import APIControllers from './../../../../controllers/API/index';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userProfile : {
                username: '',
                age: '',
                tel: '',
                email: '',
                addresses: ''
            }
        }

        this.apiAuthCtrl = new APIAuthenticateControllers();
    }
    
    onChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name] : value
        })
    }

    connect = () => {
        this.props.history.push("/sign-in");
    }

    signOut = () => {
        this.apiAuthCtrl.signOut(this.props);
    }

    render() {
        var { username, age, tel, email, address } = this.props;
        if (!this.props.isSignedin) {
            return (
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={this.connect}
                    >
                        Connect >>
                </button>
                </div>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="row">
                        <div className="alert alert-success">
                            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                            <h2> Hi <strong><span>{username}</span></strong>, let's check your profile shall we?</h2>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.showProfile}
                            >
                                Profile
                            </button>
                        </div>
                    </div>
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h3 className="panel-title">{username}'s profile</h3>
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
                            <label>Address</label>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    placeholder="Input house address"
                                    value={address}
                                    onChange={this.onChange} />
                            </div>
                            <br />
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
                                onClick={this.signOut}
                            >
                                Sign out
                            </button>
                        </form>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default Home;
