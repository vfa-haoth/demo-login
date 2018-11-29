import React, { Component } from 'react';
import APIControllers from './../../../../controllers/API/index';
import APIAuthenticateControllers from '../../../../controllers/API/authenticate';
import AddAddressForm from '../AddAddressForm/AddAddressForm';
import './Home.css';
import AddressList from '../AddressList/AddressList';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userProfile: {
                username: '',
                age: '',
                tel: '',
                email: '',
                addressIDs: []
            },
            addAddress: false,
            isSignedin: false,
            signingIn: false,
            openAddForm: false,
            editAddress: {}
        }

        this.apiCtrl = new APIControllers();
        this.apiAuthCtrl = new APIAuthenticateControllers();
        this.onSubmit = this.onSubmit.bind(this);
    }

    getSigninData = async () => {
        var result = await this.apiCtrl.getUserData();
        if (result.success) {
            this.setState({
                isSignedin: true,
                userProfile: {
                    username: result.userData[0].username,
                    age: result.userData[0].age,
                    tel: result.userData[0].tel,
                    email: result.userData[0].email,
                    addressIDs: result.userData[0].addressIDs
                }
            })
        } else {
            this.setState({
                isSignedin: false,
                username: ''
            })
        }
    }

    async componentWillMount() {
        await this.getSigninData();
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

    isDeleting = (addressList) => {
        this.setState({
            userProfile: {
                username: this.state.userProfile.username,
                age: this.state.userProfile.age,
                tel: this.state.userProfile.tel,
                email: this.state.userProfile.email,
                addressIDs: addressList
            },
            openAddForm: false,
            addAddress: false
        })
    }

    isAddedNewAddress = (addressList) => {
        console.log(addressList)
        this.setState({
            addAddress: true,
            userProfile: {
                username: this.state.userProfile.username,
                age: this.state.userProfile.age,
                tel: this.state.userProfile.tel,
                email: this.state.userProfile.email,
                addressIDs: addressList
            },
        })
    }

    editingAddress = (address) => {
        console.log(address)
        this.openAddAddress();
        this.setState({
            editAddress: address,
            addAddress: false,
        })
    }

    transferEditingAddress = (addressList) => {
        console.log(addressList)
        this.setState({
            userProfile: {
                username: this.state.userProfile.username,
                age: this.state.userProfile.age,
                tel: this.state.userProfile.tel,
                email: this.state.userProfile.email,
                addressIDs: addressList
            },
            addAddress: false
        })
    }

    toggleAddAddress = () => {
        if (this.state.openAddForm && this.state.editAddress !== null) {
            this.setState({
                openAddForm: true,
                addAddress: true,
                editAddress: null
            })
        }else{
            this.setState({
                openAddForm: !this.state.openAddForm,
                addAddress: true,
                editAddress: null
            })
        }
    }

    openAddAddress = () => {
        this.setState({
            openAddForm: true
        })
    }

    closeAddAddress = () => {
        this.setState({
            openAddForm: false
        })
    }

    render() {
        var {
            username,
            age,
            tel,
            email,
            addressIDs
        } = this.state.userProfile;

        var { openAddForm, isSignedin } = this.state;

        var status = this.state.addAddress ? 'Add' : 'Save'

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
                            <h3 className="panel-title"><strong>{username}</strong>'s profile</h3>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={(event) => this.onSubmit(event)}>
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <label>Username: </label>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 info">
                                                <span className='profile-info'> {username}</span>
                                                <br />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <label>Age: </label>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 info">
                                                <span className='profile-info'> {age}</span>
                                                <br />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <label>Tel: </label>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 info">
                                                <span className='profile-info'> {tel}</span>
                                                <br />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <label>Email: </label>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 info">
                                                <span className='profile-info'> {email}</span>
                                                <br />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                <label>Address infos:</label><br />
                                                {addressIDs.length !== 0 ?
                                                    <AddressList
                                                        addressList={addressIDs}
                                                        isDeleting={(addressList) => this.isDeleting(addressList)}
                                                        editingAddress={(address) => this.editingAddress(address)}
                                                    /> : ''}
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
                                {openAddForm ?
                                    <AddAddressForm
                                        isAddedNewAddress={(addressList) => this.isAddedNewAddress(addressList)}
                                        editAddress={this.state.editAddress}
                                        transferEditingAddress={(addressList) => this.transferEditingAddress(addressList)}
                                        status={status}
                                    /> : ''}
                            </div>
                        </div>
                    </div>
                </React.Fragment >
            )
        }
    }
}

export default Home;
