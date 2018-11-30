import React, { Component } from 'react';
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
        this.isUpdate = false;
        this.addressGot = [];
        this.editingAddress = {};

        this.apiCtrl = new APIControllers();
        this.userID = JSON.parse(localStorage.getItem('userData'))._id;
    }

    componentDidMount() {
        var editAddress = this.props.editAddress;
        console.log(editAddress)
        if (editAddress !== null) {
            this.setState({
                codeField: editAddress.code,
                streetField: editAddress.street,
                wardField: editAddress.ward,
                districtField: editAddress.district,
                cityField: editAddress.city
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.editAddress) {
            var { editAddress } = nextProps;
            this.setState({
                codeField: editAddress.code,
                streetField: editAddress.street,
                wardField: editAddress.ward,
                districtField: editAddress.district,
                cityField: editAddress.city,
            })
        } else {
            this.setState({
                codeField: '',
                streetField: '',
                wardField: '',
                districtField: '',
                cityField: '',
                update: false
            })
        }
    }

    getDataOnFields = () => {
        var hasID = this.props.editAddress ? this.props.editAddress._id : '';

        if (hasID) {
            this.editingAddress = {
                _id: this.props.editAddress._id,
                code: this.state.codeField,
                street: this.state.streetField,
                ward: this.state.wardField,
                district: this.state.districtField,
                city: this.state.cityField
            }
        } else {
            this.editingAddress = {
                code: this.state.codeField,
                street: this.state.streetField,
                ward: this.state.wardField,
                district: this.state.districtField,
                city: this.state.cityField
            }
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();

        if (this.props.editAddress) {
            if (this.props.editAddress._id) {
                this.isUpdate = true;

                this.getDataOnFields();
                console.log(this.props.editAddress)
                // await this.removeAddressForUpdate();
                await this.updateAddress();
            }
        } else {
            this.isSubmit = true;

            this.getDataOnFields();
            await this.createAddress();
            await this.addAddressIntoUser();
        }
        this.onClear();
    }

    // async removeAddressForUpdate() {
    //     if (this.isUpdate) {
    //         var result = await this.apiCtrl
    //             .removeAddressForUpdate(
    //                 this.editingAddress._id,
    //                 this.userID);
            
    //         if(result.success){
    //             console.log("Removed for update")
    //         }else {
    //             console.log("Remove failed")
    //         }
    //     }
    // }

    async updateAddress() {
        if (this.isUpdate) {
            var result = await this.apiCtrl.updateAddress(this.editingAddress, this.userID);

            if (result.success) {
                console.log(result.data)
                console.log("Update success")
                this.isUpdate = false;
                this.setState({
                    address: result.data.addressIDs
                })
                this.props.transferEditingAddress(this.state.address)
            } else {
                console.log("Update address failed")
            }
        }
    }

    async createAddress() {
        if (this.isSubmit) {
            var createAddress = await this.apiCtrl.saveAddress(this.editingAddress);
            if (createAddress.success) {
                console.log("Address is created")
                this.editingAddress = {
                    userID: this.userID,
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

    async addAddressIntoUser() {
        if (this.isSubmit) {
            console.log(this.editingAddress)
            var result = await this.apiCtrl.addAddressFromUser(this.editingAddress);
            if (result.success) {
                console.log("Address added into users")
                this.setState({
                    update: true,
                    address: result.data.addressIDs
                })
                this.props.isAddedNewAddress(this.state.address);
            } else {
                console.log("Add address failed")
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

    onClear = () => {
        console.log("Called cleaner")
        this.setState({
            codeField: '',
            streetField: '',
            wardField: '',
            districtField: '',
            cityField: '',
        })
    }

    render() {
        console.log(this.props.editAddress)
        var {
            codeField,
            streetField,
            wardField,
            districtField,
            cityField
        } = this.state;
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.status==='Add' ? 'Add new address' : 'Edit address'}</h3>
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
                                            value={codeField}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                                        <label>Street</label><br />
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="streetField"
                                            value={streetField}
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
                                            value={wardField}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <label>District</label><br />
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="districtField"
                                            value={districtField}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <label>City</label><br />
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cityField"
                                            value={cityField}
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
                            {this.props.status}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddAddressForm;
