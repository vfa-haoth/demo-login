import React, { Component } from 'react';
import APIControllers from './../../../../controllers/API/index';

class AddressList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: [{
                code: '',
                street: '',
                ward: '',
                district: '',
                city: ''
            }]
        }

        this.apiCtrl = new APIControllers();

        this.listOfAddress = [];
        this.addressList = JSON.parse(localStorage.getItem('userData')).addressIDs;
    }

    componentWillMount() {
        var data = JSON.parse(localStorage.getItem('userData'))
        console.log(data.addressIDs)
        if(data){
            this.setState({
                address : data.addressIDs
            })
        }
    }

    componentWillUpdate(){

    }

    // async getAddressData() {
    //     var data = await this.apiCtrl.getUserData();
    //     console.log(data)

    //     if (data.success) {
    //         console.log("Refeshed data")
    //         console.log(data.userData[0].addressIDs)
    //         this.setState({
    //             address : data.userData[0].addressIDs
    //         }) 
    //     } else {
    //         console.log("Get data failed")
    //     }
    // }

    render() {
        console.log(this.props.addressList)
        if (this.props.addressList) {
            this.state.address = this.props.addressList.map((ad, index) => {
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
        }
        console.log(this.props.address)
        return (
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
                        {this.state.address}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AddressList;