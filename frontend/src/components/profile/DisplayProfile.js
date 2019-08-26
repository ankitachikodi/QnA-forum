import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import Constants from "../../utils/constants";
import feedBar from "../feedBar/feedBar";


class DisplayProfile extends Component {

    state =
        {
            firstname: '',
            lastname: '',
            credentials: '',
            city: '',
            state: '',
            email: '',
            bio: '',

        };
    componentDidMount() {
        let state = this.state;
        console.log("In componentDidMount of display profile")
     axios.get(Constants.apiUrl+'users/profile?token=' + localStorage.getItem(Constants.tokenName))
            .then(res => {
                let user = res.data;

                console.log("user -----", user)
                if (res.status == 200) {
                    
                        
                            state.firstname = user.firstName;
                            state.lastname= user.familyName;
                            state.credentials= user.credentials;
                            state.city= user.city;
                            state.state= user.state;
                            state.email= user.email;
                            state.bio= user.bio;
                        this.setState(state);
                        

                }

            });

    }

    editButtonHandler = (e) => {
        e.preventDefault();
        this.props.history.push('/updateprofile');

    }

    render() {

        // console.log("the cookie data is " + this.state.email);
        // let redirectVal = null;
        // if (this.state.postedDataToEdit === true) {
        //     redirectVal = <Redirect to="/editProfile" />
        // }
        // else {
        //     redirectVal = <Redirect to="/displayProfile" />
        // }

        return (
            <div>
                {/* {feedBar} */}
                {/* <feedBar /> */}
            <form>
                    <fieldset >
                    <div className="row top-padding">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <h3>Your Profile</h3>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                        <br></br>
                        <table align="center">
                            <tr>
                                <td>Fist Name</td>
                                <td><input type='text' value={this.state.firstname} name='firstname' readOnly /></td>

                            </tr>
                            <br></br>
                            <tr>
                                <td>Last Name</td>
                                <td><input type='text' value={this.state.lastname} name='lastname' readOnly /></td>
                            </tr>
                       <br></br>
                            <tr>
                                <td>Email</td>
                                <td><input type='text' value={this.state.email} name='city' readOnly /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td>Bio</td>
                                <td><input type='text' value={this.state.bio} name='city' readOnly /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td>City</td>
                                <td><input type='text' value={this.state.city} name='city' readOnly /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td>State</td>
                                <td><input type='text' value={this.state.state} name='state' readOnly /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td>Credentials</td>
                                <td><input type='text' value={this.state.credentials} name='credentials' readOnly /></td>
                            </tr>
                            <br></br>
                            
                            <button onClick={this.editButtonHandler} className="btn btn-success" type="submit">Edit</button>
                        </table>

                    </fieldset>
                </form>
               
            </div>
        );
    }
}

export default DisplayProfile;