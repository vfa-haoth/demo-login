import React, { Component } from 'react';
import APIControllers from './../../../../controllers/API/index';
import APIAuthenticateControllers from '../../../../controllers/API/authenticate';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userProfile: {
                username: '',
                age: '',
                tel: '',
                email: '',
                address: [{
                    id: '',
                    code: '',
                    street: '',
                    ward: '',
                    district: '',
                    city: '',
                    userID: ''
                }],
                addressIDs: []
            },
            isSignedin: false,
            addressField: '',
            isAddAddress: true,
        }
        var isSubmit=false;
        var addressUpdating = {};

        this.apiCtrl = new APIControllers();
        this.apiAuthCtrl = new APIAuthenticateControllers();
        this.onSubmit = this.onSubmit.bind(this);
        this.splitAddressAttribute = this.splitAddressAttribute.bind(this);
    }

    checkSignedIn = async () => {
        var result = await this.apiCtrl.getUserData();
        if (result.success) {
            this.setState({
                isSignedin: true,
                username: result.userData[0].username,
                age: result.userData[0].age,
                tel: result.userData[0].tel,
                email: result.userData[0].email,
                addressIDs: result.userData[0].addressIDs,
                address: result.addressData.map(address => {
                    return (
                        {
                            code: address.code,
                            street: address.street,
                            ward: address.ward,
                            district: address.district,
                            city: address.city
                        }
                    )
                })
            })

        } else {
            this.setState({
                isSignedin: false,
                username: ''
            })
        }
    }

    componentDidMount() {
        this.checkSignedIn();
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
        console.log(addressField);
        var attributeArray = addressField.split(" ");
        console.log(attributeArray);

        var userData = JSON.parse(localStorage.getItem('userData'));

        this.setState({
            // test: attributeArray[0],
            userProfile: {
                address: {
                    code: attributeArray[0],
                    street: attributeArray[1],
                    ward: attributeArray[2],
                    district: attributeArray[3],
                    city: attributeArray[4],
                    userID: userData._id
                }
            }
        })
    }

    async componentWillUpdate() {
        console.log(this.isSubmit + " clicked")
        if (this.isSubmit) {
            this.isSubmit = !this.isSubmit;
            var oneObj = this.state.userProfile.address[0];
            console.log(oneObj);
            var createAddress = await this.apiCtrl.saveAddress(oneObj);

            console.log(this.state.userProfile.address);
            
            if (createAddress.success) {
                console.log("Address is created")
                this.addressUpdating = {
                    id : createAddress.data._id,
                    userID : this.state.userProfile.address.userID
                }
                console.log(this.addressUpdating)
            } else {
                console.log("Create address failed!")
            }

            // var result = await this.apiCtrl.updateAddress(this.addressUpdating);
            // console.log(this.state.userProfile.address);

            // if (result.success) {
            //     console.log(this.state.userProfile.address);

            //     console.log("Address updated")
            //     console.log(result.data.addressIDs)
            //     // return true;
            // } else {
            //     console.log("Update address failed");
            // }
        }
    }

    async onSubmit(event) {
        event.preventDefault();

        this.isSubmit = !this.isSubmit;

        console.log(this.state.isSubmit)

        this.splitAddressAttribute(this.state.addressField);
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
            addressIDs,
            addressField,
            address,
            isAddAddress
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
            // console.log(listOfAddress);
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
                                        placeholder="Input address as format <code> <street> <ward> <district> <city>"
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
