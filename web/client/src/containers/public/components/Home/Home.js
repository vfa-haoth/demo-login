import React, { Component } from 'react';

class Home extends Component {

    onClick = () => {
        this.props.history.push("/sign-in");
    }

    render() {
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
        );
    }
}

export default Home;
