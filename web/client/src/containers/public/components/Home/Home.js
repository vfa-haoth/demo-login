import React, { Component } from 'react';
import APIControllers from './../../../../controllers/API/index';
import APIAuthenticateControllers from '../../../../controllers/API/authenticate';
import AddressList from '../AddressList/AddressList';
import AddAddressForm from '../AddAddressForm/AddAddressForm';
import './Home.css';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userProfile: {
                username: '',
                age: '',
                tel: '',
                email: '',
                addressIDs: [{
                    id: '',
                    code: '',
                    street: '',
                    ward: '',
                    district: '',
                    city: '',
                }]
            },
            isSignedin: false,
            addressField: '',
            isAddingAddress: false
        }
        var isSubmit = false;
        var addressUpdating = {};

        this.apiCtrl = new APIControllers();
        this.apiAuthCtrl = new APIAuthenticateControllers();
        this.onSubmit = this.onSubmit.bind(this);
    }

    getSigninData = async () => {
        var result = await this.apiCtrl.getUserData();
        if (result.success) {
            this.setState({
                isSignedin: true,
                username: result.userData[0].username,
                age: result.userData[0].age,
                tel: result.userData[0].tel,
                email: result.userData[0].email,
                addressIDs: result.userData[0].addressIDs,
                // address: result.addressData.map(address => {
                //     return (
                //         {
                //             code: address.code,
                //             street: address.street,
                //             ward: address.ward,
                //             district: address.district,
                //             city: address.city
                //         }
                //     )
                // })
            })

        } else {
            this.setState({
                isSignedin: false,
                username: ''
            })
        }
    }

    componentDidMount() {
        this.getSigninData();
    }

    onChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })
    }

    async onSubmit(event) {
        //Update user profile
        event.preventDefault();
    }

    connect = () => {
        this.props.history.push("/sign-in");
    }

    signOut = () => {
        this.apiAuthCtrl.signOut(this.props);
    }

    toggleAddAddress = () => {
        this.setState({
            isAddingAddress: !this.state.isAddingAddress
        })
    }

    render() {
        var {
            username,
            age,
            tel,
            email,
            addressIDs,
            addressField,
            isAddingAddress
        } = this.state;

        if (!this.state.isSignedin) {
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

            // console.log(listOfAddress);
            var addingAddress = isAddingAddress ?
                <AddAddressForm
                /> : '';
            return (
                <React.Fragment>
                    <div className="row text-center">
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
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <label>Username: </label>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 info">
                                                <span className='profile-info'> {username}</span>
                                                <br />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <label>Age: </label>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 info">
                                                <span className='profile-info'> {age}</span>
                                                <br />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <label>Tel: </label>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 info">
                                                <span className='profile-info'> {tel}</span>
                                                <br />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <label>Email: </label>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 info">
                                                <span className='profile-info'> {email}</span>
                                                <br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={this.onEditProfile}
                                    >
                                        Change profile
                                    </button>
                                    &nbsp;
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={this.toggleAddAddress}
                                    >
                                        Add address
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger signout"
                                        onClick={this.signOut}
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </form>
                            <br />
                            <div>
                                {addingAddress}
                            </div>
                        </div>
                    </div>
                </React.Fragment >
            )
        }
    }
}

export default Home;
