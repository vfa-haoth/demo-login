import React, { Component } from 'react';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            isSignedIn: false
        }
    }

    onClick = () => {
        this.props.history.push("/sign-in");
    }

    render() {
        var { isSignedIn, username } = this.state;
        if (!isSignedIn) {
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
        }else {
            return (
                <React.Fragment>
                    <div className="row">
                        <p>Hello<br/><h2>{username}</h2></p>
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
