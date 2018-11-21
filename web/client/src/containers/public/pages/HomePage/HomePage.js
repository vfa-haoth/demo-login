import React, { Component } from 'react';
import Home from '../../components/Home/Home';

class HomePage extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <Home history={this.props.history}/>
                </div>
            </div>
        )
    }
}

export default HomePage;
