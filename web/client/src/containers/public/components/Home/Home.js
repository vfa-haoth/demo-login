import React, { Component } from 'react';
import APIControllers from './../../../../controllers/API/index';
import APIAuthenticateControllers from '../../../../controllers/API/authenticate';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userProfile: {
                id: '',
                username: '',
                age: '',
                tel: '',
                email: '',
                address: [{
                    code: '',
                    street: '',
                    ward: '',
                    district: '',
                    city: '',
                    userID: ''
                }],
                addressIDs: []
            },
            addressField: '',
            isAddAddress: false
        }

        this.apiCtrl = new APIControllers();
        this.apiAuthCtrl = new APIAuthenticateControllers();
    }

    componentWillMount() {
        var { username, age, tel, email, addressIDs, addressField, address } = this.props;
        this.setState({
            username,
            age,
            tel,
            email,
            addressIDs,
            addressField,
            address
        })
    }

    onChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })
    }

    splitAddressAttribute = (addressField) => {
        var attributeArray = addressField.split(" ");
        this.setState({
            code : attributeArray[0],
            street : attributeArray[1],
            ward : attributeArray[2],
            district : attributeArray[3],
            city : attributeArray[4]
        })
    }

    async onSubmit() {
        var userData = JSON.parse(localStorage.getItem('userData'));
        this.setState({
            userID: userData.id
        })

        this.splitAddressAttribute(this.state.addressField);

        var createAddress = await this.apiCtrl.saveAddress(this.state.userProfile.address);
        createAddress.then(val => {
            if (val.success) {
                return true;
            } else {
                throw new Error("Create address failed!")
            }
        })

        var result = await this.apiCtrl.updateAddress(this.state.userProfile.address);
        result.then(val => {
            if (val.success) {
                this.props.history.push("/");
                return true;
            } else {
                console.log("Sign up failed!");
            }
        })
    }

    onAddAddress = () => {
        this.setState({
            isAddAddress: !this.state.isAddAddress
        })
    }

    connect = () => {
        this.props.history.push("/sign-in");
    }

    signOut = () => {
        this.apiAuthCtrl.signOut(this.props);
    }

    render() {
        var {
            username,
            age,
            tel,
            email,
            address,
            addressField,
            isAddAddress
        } = this.state;

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
            const listOfAddress = address.map((ad, index) => {
                return (
                    <tr key={index}>
                        <td>{ad.code}</td>
                        <td>{ad.street}</td>
                        <td>{ad.ward}</td>
                        <td>{ad.district}</td>
                        <td>{ad.city}</td>
                    </tr>
                )
            })
            console.log(address)
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
                                        onChange={this.onChange}
                                        disabled={isAddAddress ? true : false} />
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
                                        onChange={this.onChange}
                                        disabled={isAddAddress ? true : false} />
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
                                        onChange={this.onChange}
                                        disabled={isAddAddress ? true : false} />
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
                                        onChange={this.onChange}
                                        disabled={isAddAddress ? true : false} />
                                </div>
                                <br />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={this.onAddAddress}
                                >
                                    {isAddAddress ? 'Edit profile' : 'Add address'}
                                </button>
                                <br />
                                <br />
                                <label>Address</label>
                                <div className="form-group">
                                    <textarea
                                        name="addressField"
                                        className="form-control"
                                        rows="3"
                                        placeholder="Input house address"
                                        value={addressField}
                                        onChange={this.onChange}
                                        disabled={isAddAddress ? false : true}
                                    />
                                </div>
                                <br />
                                <div className="panel panel-default">
                                    <div className="panel-heading">List of addresses</div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Code</th>
                                                <th>Street</th>
                                                <th>Ward</th>
                                                <th>District</th>
                                                <th>City</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listOfAddress}
                                        </tbody>
                                    </table>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.onSubmit}
                                >
                                    Change profile
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
