import React, { Component } from 'react';
import SignUp from '../../components/SignUp/SignUp';

class SignUpPage extends Component {
    render() {
        return (
            <div>

                <div>
                    <div className="row">
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <SignUp history={this.props.history}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUpPage;
