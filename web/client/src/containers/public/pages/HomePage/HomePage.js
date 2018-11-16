import React, { Component } from 'react';
import Home from '../../components/Home/Home';
import APIControllers from './../../../../controllers/API/index';
import APIAuthenticateControllers from './../../../../controllers/API/authenticate';

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            age: '',
            tel: '',
            email: '',
            address: '',
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
                username: result.data[0].username,
                age: result.data[0].age,
                tel: result.data[0].tel,
                email: result.data[0].email,
                address: result.data[0].address,
            })
        } else {
            this.setState({
                isSignedin: false,
                username: ''
            })
        }
    }

    // async getUserDetail(){
    //     const result = await this.apiCtrl.getUserData();
    //     if(result.success){
    //         this.setState({
    //             username : result.username,
    //             age : result.age,
    //             tel : result.tel,
    //             email : result.email,
    //             address : result.address
    //         })
    //     }
    // }

    componentDidMount() {
        this.checkSignedIn();
        // this.getUserDetail();
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
                                isSignedin={this.state.isSignedin}
                            />
                        </div>
                        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5"></div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Home
                            history={this.props.history}
                            username={this.state.username}
                            age={this.state.age}
                            tel={this.state.tel}
                            email={this.state.email}
                            address={this.state.address}
                            isSignedin={this.state.isSignedin}
                        />
                    </div>
                </div>
            )
        }
    }
}

export default HomePage;
