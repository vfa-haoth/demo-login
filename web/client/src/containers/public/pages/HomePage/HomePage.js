import React, { Component } from 'react';
import Home from '../../components/Home/Home';

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <div class="row">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5"></div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <Home history={this.props.history} />
                    </div>
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5"></div>
                </div>
            </React.Fragment>
        );
    }
}

export default HomePage;
