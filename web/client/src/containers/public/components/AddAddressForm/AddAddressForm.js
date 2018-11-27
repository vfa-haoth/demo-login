import React, { Component } from 'react';
import AddressList from '../AddressList/AddressList';
import APIControllers from './../../../../controllers/API/index';

class AddAddressForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            address: [{
                id: '',
                code: '',
                street: '',
                ward: '',
                district: '',
                city: ''
            }],
            codeField: '',
            streetField: '',
            wardField: '',
            districtField: '',
            cityField: '',
            update: false
        }
        this.hasAddress = false;
        this.isSubmit = false;
        this.addressGot = [];
        this.editingAddress = {};

        this.apiCtrl = new APIControllers();

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillMount() {
        var data = JSON.parse(localStorage.getItem('userData'));
        console.log(data.addressIDs)

        this.setState({
            address: data.addressIDs,
        })
    }

    splitAddressAttribute = () => {
        this.editingAddress = {
            code: this.state.codeField,
            street: this.state.streetField,
            ward: this.state.wardField,
            district: this.state.districtField,
            city: this.state.cityField
        }
    }

    async onSubmit(event) {
        event.preventDefault();

        console.log(this.isSubmit)

        this.isSubmit = true;

        this.splitAddressAttribute();
        await this.createAddress();
        await this.updateAddress();
    }

    async createAddress() {
        if (this.isSubmit) {
            var createAddress = await this.apiCtrl.saveAddress(this.editingAddress);
            if (createAddress.success) {
                console.log("Address is created")
                this.editingAddress = {
                    userID: JSON.parse(localStorage.getItem('userData'))._id,
                    id: createAddress.data._id,
                    code: createAddress.data.code,
                    street: createAddress.data.street,
                    ward: createAddress.data.ward,
                    district: createAddress.data.district,
                    city: createAddress.data.city,
                }
            } else {
                console.log("Create address failed!")
            }
        }
    }

    async updateAddress() {
        if (this.isSubmit) {
            var result = await this.apiCtrl.addAddressFromUser(this.editingAddress);
            if (result.success) {
                console.log("Address updated")
                this.setState({
                    update: true,
                    address: [
                        ...this.state.address, {
                            id: this.editingAddress.id,
                            code: this.editingAddress.code,
                            street: this.editingAddress.street,
                            ward: this.editingAddress.ward,
                            district: this.editingAddress.district,
                            city: this.editingAddress.city,
                        }]
                })
                this.props.isAddedNewAddress(this.state.address);
            } else {
                console.log("Update address failed")
            }
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
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Add address</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                        <label>Code</label><br />
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="codeField"
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                                        <label>Street</label><br />
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="streetField"
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div><br />
                                <div className="row">
                                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                        <label>Ward</label><br />
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="wardField"
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <label>District</label><br />
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="districtField"
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <label>City</label><br />
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cityField"
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={this.onSubmit}
                        >
                            Add
                    </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddAddressForm;
