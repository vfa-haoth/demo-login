import React, { Component } from 'react';

class AddressList extends Component {

    constructor(props){
        super(props);
        this.state = {
            address : [{
                code : '',
                street : '',
                ward : '',
                district : '',
                city : ''
            }]
        }
        this.addressList = JSON.parse(localStorage.getItem('userData')).addressIDs;
    }

    render() {
        
        const listOfAddress = this.addressList.map((ad, index) => {
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
                        {listOfAddress}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AddressList;