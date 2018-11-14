import React, { Component } from 'react';
import APIControllers from './../../../../controllers/API/index';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username : '',
            isSignedin : false
        }

        this.apiCtrl = new APIControllers();
    }

    checkSignedIn = async() => {
        var result = await this.apiCtrl.getUserData()
        console.log(result)
        if(result.success){
            this.setState({
                isSignedin : true,
                username : result.data
            })
        }else{
            this.setState({
                isSignedin : false,
                username : ''
            })
        }
    } 

    componentDidMount(){
        this.checkSignedIn();
    }

    onClick = () => {
        this.props.history.push("/sign-in");
    }

    render() {
        var { isSignedin, username } = this.props;
        if (!isSignedin) {
            return (
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={this.onClick}
                    >
                        Connect >>
                </button>
                </div>
            )
        } else {
            return (
                <React.Fragment>
                    <div className="row">
                        <p>Hello<br /><h2>{username}</h2></p>
                    </div>
                    <div className="row">
                        <button type="button" className="btn btn-large btn-block btn-danger">Sign out</button>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default Home;
