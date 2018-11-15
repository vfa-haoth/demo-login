import React, { Component } from 'react';
import Home from '../../components/Home/Home';
import APIControllers from './../../../../controllers/API/index';
import APIAuthenticateControllers from './../../../../controllers/API/authenticate';

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            isSignedin: false
        }

        this.apiCtrl = new APIControllers();
        this.apiAuthCtrl = new APIAuthenticateControllers();
    }

    checkSignedIn = async () => {
        var result = await this.apiCtrl.getUserData();
        if (result.success) {
            this.setState({
                isSignedin: true,
                username: result.data[0].username
            })
        } else {
            this.setState({
                isSignedin: false,
                username: ''
            })
        }
    }

    componentDidMount() {
        this.checkSignedIn();
    }

    render() {
        if (!this.state.isSignedin) {
            return (
                <React.Fragment>
                    <div className="row">
                        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5"></div>
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <Home
                                history={this.props.history}
                                username={this.state.username}
                                isSignedin={this.state.isSignedin}
                            />
                        </div>
                        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5"></div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Home
                            history={this.props.history}
                            username={this.state.username}
                            isSignedin={this.state.isSignedin}
                        />
                    </div>
                </div>
            )
        }
    }
}

export default HomePage;
