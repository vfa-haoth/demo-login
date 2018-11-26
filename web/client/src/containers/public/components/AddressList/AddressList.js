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
        this.addressShown = [];

        this.apiCtrl = new APIControllers();

        this.listOfAddress = [];
        this.addressList = JSON.parse(localStorage.getItem('userData')).addressIDs;
    }

    componentWillMount() {
        var data = JSON.parse(localStorage.getItem('userData'))
        if(data){
            this.setState({
                address : data.addressIDs
            })
        }
    }

    render() {
        if (this.props.addressList) {
            this.addressShown = this.props.addressList.map((ad, index) => {
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
        return (
            <div className="panel panel-default">
                <div className="panel-heading text-center">List of addresses</div>
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
                        {this.addressShown}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AddressList;