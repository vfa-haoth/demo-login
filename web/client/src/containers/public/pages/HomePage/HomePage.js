import React, { Component } from 'react';
import Home from '../../components/Home/Home';

class HomePage extends Component {
    render() {
        return (
            <div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <Home history={this.props.history} />
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                </div>
            </div>
        )
    }
}

export default HomePage;
