import React, { Component } from 'react';
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
                addresses: {}
            }
        }

        this.apiCtrl = new APIControllers();
    }

    showAddresses = () => {
        var result = this.apiCtrl.getUserData();
        if(result.success) {
            this.setState({
                username : result.data[0].username,
                password : result.data[0].password,
                age : result.data[0].age,
                tel : result.data[0].tel,
                email : result.data[0].email,
                addresses : result.data[0].addresses
            })
        }
    }

    connect = () => {
        this.props.history.push("/sign-in");
    }

    signOut = () => {
        this.apiAuthCtrl.signOut();
    }

    toggle = () => {
        this.setState({
            ddOpen: !this.state.ddOpen
        })
    }

    render() {
        var { isSignedin, username } = this.props;
        if (!isSignedin) {
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
                        <div class="alert alert-success">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                            <h2> Hi <strong><span>{username}</span></strong>, let's check your profile shall we?</h2>
                            <button
                                type="button"
                                class="btn btn-success"
                                onClick={this.showProfile}
                            >
                                Profile
                            </button>
                        </div>
                    </div>
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3 class="panel-title">{username}'s profile</h3>
                        </div>
                        <div class="panel-body">
                            {this.showAddresses}
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default Home;
