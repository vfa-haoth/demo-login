import React, { Component } from 'react';
import APIControllers from './../../../../controllers/API/index';
import './AddressList.css';

class AddressList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: [],
            // addingField : {
            //     codeField : '',
            //     streetField : '',
            //     wardField : '',
            //     districtField : '',
            //     cityField : ''
            // }
        }

        this.isDataGotten = false
        this.isDelete = false
        this.isEdit = false
        this.editingAddress = {}

        this.apiCtrl = new APIControllers();
    }

    async onDelete(address){
        if (confirm('Are you sure you want to delete this address?')) { //eslint-disable-line
            this.isDelete = true
            
            await this.removeAddress(address);
        }
    }

    async removeAddress(address) {
        if (this.isDelete) {
            var userID = JSON.parse(localStorage.getItem('userData'));
            var result = await this.apiCtrl
                .removeAddress(address._id, userID._id)

            if (result.success) {
                console.log(result.userData.addressIDs)
                console.log("Deleted address")  
                this.props.isDeleting(result.userData.addressIDs)

                this.isDelete = false
            } else {
                console.log("Delete address failed")
            }
        }
    }

    async onEdit(address) {
        this.editingAddress = {
            _id : address._id,
            code : address.code,
            street : address.street,
            ward : address.ward,
            district : address.district,
            city : address.city
        }
        this.props.editingAddress(this.editingAddress)
    }

    render() {
        console.log(this.props.addressList)
        if (this.props.addressList) {
            var showAddress = this.props.addressList.map((ad, index) => {
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
                                onClick={() => this.onEdit(ad)}
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
                        {showAddress}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AddressList;