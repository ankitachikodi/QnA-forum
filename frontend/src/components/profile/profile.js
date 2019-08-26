import React, { Component } from 'react';
import axios from 'axios';
import Constants from "../../utils/constants";
import ProfileService from "./profile.service";
import { decode } from 'jsonwebtoken';

class Profile extends Component {
	constructor(){
		super();
		this.state = {
			firstName: '',
			middleName: '',
			familyName: '',
			credentials: '',
			education: '',
			career: '',
			city: '',
			state: '',
			email: '',
			bio: '',
			zip: '',
			error: {}
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	onChangeInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

	componentDidMount(){
		axios.get(Constants.apiUrl + 'users/profile?token=' + localStorage.getItem(Constants.tokenName))
		.then(res => {
			let user = res.data;
			let state = this.state;

			console.log("user -----", user)
			if (res.status == 200) {
				state.firstName = user.firstName;
				state.familyName = user.familyName;
				state.middleName = user.middleName;
				state.credentials = user.credentials;
				state.career = user.career;
				state.education = user.education;
				state.city = user.city;
				state.state = user.state;
				state.zip = user.zip;
				state.bio = user.bio;
				state.email = user.email;
				this.setState(state);
			}
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if(Object.entries(this.validate()).length === 0){
			const data = {
				firstName: this.state.firstName,
				familyName: this.state.familyName,
				middleName: this.state.middleName,
				city: this.state.city,
				state: this.state.state,
				credentials: this.state.credentials,
				bio: this.state.bio,
				career: this.state.career,
				education: this.state.education,
				zip: this.state.zip

				//image: this.state.image
			};

			console.log("Updated Data ---", data)

			ProfileService.updateProfile(data, resp => {
				// console.log('/profileother/' + decode(localStorage.getItem(Constants.tokenName)).user);
				this.props.history.push('/profileother/' + decode(localStorage.getItem(Constants.tokenName)).user);
			});
		}
	}

	validate(){
        const error = {};
        const states = ['Alabama', 'AL', 'Alaska', 'AK', 'Arkansas', 'AR', 'Arizona', 'AZ', 'California', 'CA', 'Delaware', 'DE', 'District of Columbia', 'DC', 'Connecticut', 'CT', 'Colorado', 'CO', 'North Carolina', 'NC', 'South Carolina', 'SC', 'North Dakota', 'ND', 'South Dakota', 'SD', 'Florida', 'FL', 'Georgia', 'GA', 'New Hampshire', 'NH', 'Hawaii', 'HI', 'Iowa', 'IA', 'Idaho', 'ID', 'Illinois', 'IL', 'Indiana', 'IN', 'New Jersey', 'NJ', 'Kansas', 'KS', 'Kentucky', 'KY', 'Louisiana', 'LA', 'Maine', 'ME', 'Minnesota', 'MN', 'Massachusettes', 'MA', 'Mississippi', 'MS', 'Montana', 'MT', 'Maryland', 'MD', 'Michigan', 'MI', 'Missourie', 'MO', 'New Mexico', 'NM', 'Nevada', 'NV', 'Nebraska', 'NE', 'Ohio', 'OH', 'Oklahoma', 'OK', 'Oregon', 'OR', 'Pennsylvania', 'PA', 'Rhode Island', 'RI', 'Tennessee', 'TN', 'Texas', 'TX', 'Utah', 'UT', 'Virginia', 'VA', 'West Virginia', 'WV', 'Vermont', 'VT', 'Washington', 'WA', 'Wisconsin', 'WI', 'Wyoming', 'WY', 'New York', 'NY'];
        if(!this.state.firstName){
            error.firstName = 'Enter First Name';
        }
        if(!this.state.familyName){
            error.familyName = 'Enter Family Name';
        }
        if(!this.state.city){
            error.city = 'Enter City';
        }
        if(!this.state.state){
            error.state = 'Enter State';
        }else{
            if(states.filter(state =>{
                return state === this.state.state;
            }).length < 1){
                error.state = 'Malformed State';
            }
        }
        if(!this.state.zip){
            error.zip = 'Enter Zip';
        }else if(!new RegExp("^[0-9]{5}$|^[0-9]{5}\-[0-9]{4}$").test(this.state.zip)){
            error.zip = 'Enter Valid Zip';
		}
		if(!this.state.career){
            error.career = 'Enter Career Details';
		}
		if(!this.state.education){
            error.education = 'Enter Education Details';
		}
		if(!this.state.credentials){
            error.credentials = 'Enter Credentials';
        }
        this.setState({error: error});
        return error;
    }

  // getBase64(file, cb) {
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = function () {
  //         cb(reader.result)
  //     };
  //     reader.onerror = function (error) {
  //         console.log('Error: ', error);
  //     };
  // }

  // fileChangedHandler = (e) => {

  //     let idCardBase64 = '';
  //     this.getBase64(e.target.files[0], (result) => {
  //         idCardBase64 = result;
  //     });

  //     const file = e.target.files[0]
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //         this.setState({
  //             image: idCardBase64
  //         })
  //     }
  //     if (file) {
  //         reader.readAsDataURL(file);
  //         this.setState({
  //             image: idCardBase64
  //         })
  //     }
  //     else {
  //         this.setState({
  //             image: ""
  //         })
  //     }
  // }

  // uploadHandler = () => {
  //     console.log(this.state.image)
  // }

render() {
// let submitstatus = this.state.authflag ? 'Profile Updated!' : '';
// if (this.props.existingProfile[0] !== undefined) {
//     this.state.existingProfile[0] = this.props.existingProfile[0];
//     this.state.image = this.props.existingProfile[0].image;
//     console.log("test: ", this.state.existingProfile);
// }
		return (
			<div className='logindiv'>
                    <form className='signupBox1' onSubmit={this.handleSubmit}>
                        <h2>Edit Profile</h2>
                        <div className='inputArea'>
                            <div className="formElem">
                                <input type='text' name='firstName' className="textfield" value={this.state.firstName} onChange={this.handleChange} />
                                <label>First Name</label>
                                <p className='error'>{this.state.error.firstName}</p>
                            </div>
                            <div className="formElem">
                                <input type='text' name='middleName' className="textfield" value={this.state.middleName} onChange={this.handleChange} />
                                <label>Middle Name</label>
                            </div>
                            <div className="formElem">
                                <input type='text' name='familyName' className="textfield" value={this.state.familyName} onChange={this.handleChange} />
                                <label>Family Name</label>
                                <p className='error'>{this.state.error.familyName}</p>
                            </div>
                            <div className="formElem">
                                <input type='text' name='city' className="textfield" value={this.state.city} onChange={this.handleChange} />
                                <label>City</label>
                                <p className='error'>{this.state.error.city}</p>
                            </div>
                            <div className="formElem">
                                <input type='text' name='state' className="textfield" value={this.state.state} onChange={this.handleChange} />
                                <label>State</label>
                                <p className='error'>{this.state.error.state}</p>
                            </div>
                            <div className="formElem">
                                <input type='text' name='zip' className="textfield" value={this.state.zip} onChange={this.handleChange} />
                                <label>Zip</label>
                                <p className='error'>{this.state.error.zip}</p>
                            </div>
                            <div className="formElem">
                                <input type='text' name='education' className="textfield" value={this.state.education} onChange={this.handleChange} />
                                <label>Education</label>
                                <p className='error'>{this.state.error.education}</p>
                            </div>
                            <div className="formElem">
                                <input type='text' name='career' className="textfield" value={this.state.career} onChange={this.handleChange} />
                                <label>Career</label>
                                <p className='error'>{this.state.error.career}</p>
                            </div>
                            <div className="formElem">
                                <input type='text' name='credentials' className="textfield" value={this.state.credentials} onChange={this.handleChange} />
                                <label>Credentials</label>
                                <p className='error'>{this.state.error.credentials}</p>
                            </div>
                        </div>
                        <input type="submit" className='Button' value="Update Profile" />
                    </form>
                </div>
			// <div>
			// 	<div className="container">
			// 		<h3>Profile Image</h3>
			// 		<img className="profile_photo_img" src="https://qsf.fs.quoracdn.net/-3-images.new_grid.profile_pic_default.png-26-345032f7d91f49f2.png" alt="Ankita Chikodi" height="200" width="200" />
			// 		<br />
			// 		<input type="file" accept='.jpg,.png,.bmp' />
			// 		<form onSubmit={this.onSubmitProfile}>
			// 		<div style={{ width: "30%" }} className="form-group">
			// First Name
			// <input
			// onChange={this.onChangeInput}
			// value={this.state.firstName}
			// type="text"
			// className="form-control"
			// name="firstName"
			// placeholder="first name"
			// />
			// </div>
			// <div style={{ width: "30%" }} className="form-group">
			// Last Name
			// <input
			// onChange={this.onChangeInput}
			// value={this.state.lastName}
			// type="text"
			// className="form-control"
			// name="lastName"
			// placeholder="last name"
			// />
			// </div>
			// <div style={{ width: "30%" }} className="form-group">
			// Bio
			// <input
			// onChange={this.onChangeInput}
			// value={this.state.bio}
			// type="text"
			// className="form-control"
			// name="bio"
			// placeholder="bio"
			// />
			// </div>
			// <div style={{ width: "30%" }} className="form-group">
			// Email
			// <input
			// onChange={this.onChangeInput}
			// value={this.state.email}
			// type="text"
			// className="form-control"
			// name="email"
			// placeholder="email"
			// />
			// </div>

			// <div style={{ width: "30%" }} className="form-group">
			// City:
			// <input
			// onChange={this.onChangeInput}
			// value={this.state.city}
			// type="text"
			// className="form-control"
			// name="city"
			// placeholder="city"
			// />
			// </div>
			// <div style={{ width: "30%" }} className="form-group">
			// State:
			// <input
			// onChange={this.onChangeInput}
			// value={this.state.state}
			// type="text"
			// className="form-control"
			// name="state"
			// placeholder="state"
			// />
			// </div>
			// <div style={{ width: "30%" }} className="form-group">
			// Credentials
			// <input
			// onChange={this.onChangeInput}
			// value={this.state.credentials}
			// type="text"
			// className="form-control"
			// name="credentials"
			// placeholder="credentials"
			// />
			// </div>
			// <div style={{ width: "30%" }}>
			// <button
			// onClick={this.onSubmitProfile}
			// className="btn btn-success"
			// type="submit"
			// >
			// Update
			// </button>
			// </div>
			// </form>
			// </div>
			// </div>
		);
	}
}

export default Profile;