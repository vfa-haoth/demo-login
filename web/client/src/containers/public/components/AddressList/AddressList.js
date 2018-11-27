import React, { Component } from 'react';
import APIControllers from './../../../../controllers/API/index';
import './AddressList.css';

class AddressList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: [],
            isDelete: false
        }
        this.editingAddress = {}

        this.apiCtrl = new APIControllers();

        this.listOfAddress = [];
        this.addressList = JSON.parse(localStorage.getItem('userData')).addressIDs;
    }

    onDelete = (address) => {
        this.setState({
            isDelete: true
        })
        this.editingAddress = address;
    }

    async componentDidUpdate() {
        if (this.state.isDelete) {
            var userID = JSON.parse(localStorage.getItem('userData'))._id;
            var result = await this.apiCtrl.removeAddress(this.editingAddress, userID);

            if (result.success) {
                console.log("Deleted address")
            } else {
                console.log("Delete address failed")
            }

            this.setState({
                isDelete : false
            })
        }
    }

    async componentWillMount() {
        var data = await this.apiCtrl.getUserData();
        console.log(data.userData[0].addressIDs)
        this.setState({
            address: data.userData[0].addressIDs
        })
    }

    render() {
        console.log(this.props.addressList)
        if (this.props.addressList) {
            this.state.address = this.props.addressList.map((ad, index) => {
                return (
                    <tr key={index}>
                        <td className="text-center">{ad.code}</td>
                        <td className="text-center">{ad.street}</td>
                        <td className="text-center">{ad.ward}</td>
                        <td className="text-center">{ad.district}</td>
                        <td className="text-center">{ad.city}</td>
                        <td className="text-center">
                            <button
                                type="button"
                                className="btn btn-warning"
                            >
                                <i className="fas fa-user-edit actions"></i>
                            </button>
                            &nbsp;
                                <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => this.onDelete(ad)}
                            >
                                <i className="fas fa-times actions"></i>
                            </button>
                        </td>
                    </tr>
                )
            })
        }
        console.log(this.props.address)
        return (
            <div className="panel panel-default">
                <div className="panel-heading text-center">List of addresses</div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-center">Code</th>
                            <th className="text-center">Street</th>
                            <th className="text-center">Ward</th>
                            <th className="text-center">District</th>
                            <th className="text-center">City</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.address}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AddressList;