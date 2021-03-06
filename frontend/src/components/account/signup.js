import React, { Component } from 'react';
import AuthService from '../../utils/auth-service';
import {Redirect} from 'react-router-dom';
import loginpage from '../../assets/loginpage.png'

class SignUp extends Component {
    constructor(){
        super();
        this.state = {
            userName: '',
            password: '',
            confpassword: '',
            email: '',
            firstName: '',
            middleName: '',
            familyName: '',
            city: '',
            state: '',
            zip: '',
            loggedIn: false,
            error: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        document.title = "Quora - Sign Up";
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        if(Object.entries(this.validate()).length === 0){
            AuthService.SignUp({
                userName: this.state.userName,
                password: this.state.password,
                email: this.state.email,
                firstName: this.state.firstName,
                middleName: this.state.middleName,
                familyName: this.state.familyName,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip
            },resp => {
                if(resp.login){
                    this.setState({loggedIn: true})
                }else{
                    alert(resp.error);
                }
            })
        }
    }

    validate(){
        const error = {};
        const states = ['Alabama', 'AL', 'Alaska', 'AK', 'Arkansas', 'AR', 'Arizona', 'AZ', 'California', 'CA', 'Delaware', 'DE', 'District of Columbia', 'DC', 'Connecticut', 'CT', 'Colorado', 'CO', 'North Carolina', 'NC', 'South Carolina', 'SC', 'North Dakota', 'ND', 'South Dakota', 'SD', 'Florida', 'FL', 'Georgia', 'GA', 'New Hampshire', 'NH', 'Hawaii', 'HI', 'Iowa', 'IA', 'Idaho', 'ID', 'Illinois', 'IL', 'Indiana', 'IN', 'New Jersey', 'NJ', 'Kansas', 'KS', 'Kentucky', 'KY', 'Louisiana', 'LA', 'Maine', 'ME', 'Minnesota', 'MN', 'Massachusettes', 'MA', 'Mississippi', 'MS', 'Montana', 'MT', 'Maryland', 'MD', 'Michigan', 'MI', 'Missourie', 'MO', 'New Mexico', 'NM', 'Nevada', 'NV', 'Nebraska', 'NE', 'Ohio', 'OH', 'Oklahoma', 'OK', 'Oregon', 'OR', 'Pennsylvania', 'PA', 'Rhode Island', 'RI', 'Tennessee', 'TN', 'Texas', 'TX', 'Utah', 'UT', 'Virginia', 'VA', 'West Virginia', 'WV', 'Vermont', 'VT', 'Washington', 'WA', 'Wisconsin', 'WI', 'Wyoming', 'WY', 'New York', 'NY']
        if(!this.state.userName){
            error.userName = 'Enter Username';
        }
        if(!this.state.firstName){
            error.firstName = 'Enter First Name';
        }
        if(!this.state.familyName){
            error.familyName = 'Enter Family Name';
        }
        if(!this.state.email){
            error.email = 'Enter Email';
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
        if(!this.state.password){
            error.password = 'Enter Password';
        }else if(!new RegExp("^(?=[a-zA-Z])(?=.*[0-9])(?=.*[#\$_%!@.~^:?()+&\/*-])(?=.*[A-Z])(?=.*[a-z])(?!.*[^a-zA-Z0-9#\$_%!@.~^:?()+&\/*-])(?!.*\s).{8,15}$").test(this.state.password)){
            error.password = 'Enter a Stronger Password';
        }
        if(this.state.confpassword !== this.state.password){
            error.confpassword = 'Passwords do not match';
        }
        this.setState({error: error});
        return error;
    }
    
    render(){
        if(this.state.loggedIn){
            return <Redirect to='/' />
        }else{
            return(
                <div className='logindiv'  style={{backgroundImage: `url(${loginpage})`}}>
                    <form className='signupBox1' onSubmit={this.handleSubmit}>
                        <div className='networklogo'>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="http://www.bohemiancoding.com/sketch/ns" width="201px" height="56px" viewBox="0 0 201 56" version="1.1" style={{width: '224px', height: '63px'}}>
                                <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                                    <g id="Imported-Layers" fill="#b92b27">
                                        <path d="M28.986,43.623 C27.068,39.848 24.818,36.035 20.429,36.035 C19.59,36.035 18.752,36.174 17.983,36.525 L16.492,33.541 C18.309,31.982 21.245,30.746 25.019,30.746 C30.89,30.746 33.903,33.574 36.295,37.184 C37.715,34.102 38.39,29.94 38.39,24.781 C38.39,11.898 34.361,5.283 24.95,5.283 C15.676,5.283 11.669,11.898 11.669,24.781 C11.669,37.596 15.676,44.143 24.95,44.143 C26.424,44.143 27.759,43.981 28.986,43.623 L28.986,43.623 Z M31.285,48.119 C29.252,48.664 27.092,48.965 24.95,48.965 C12.601,48.965 0.51,39.111 0.51,24.781 C0.51,10.315 12.601,0.459 24.95,0.459 C37.506,0.459 49.481,10.244 49.481,24.781 C49.481,32.867 45.708,39.438 40.224,43.685 C41.996,46.34 43.82,48.103 46.36,48.103 C49.132,48.103 50.25,45.961 50.437,44.281 L54.047,44.281 C54.258,46.518 53.139,55.815 43.05,55.815 C36.939,55.815 33.708,52.273 31.285,48.119 L31.285,48.119 Z" id="Fill-1"/>
                                        <path d="M57.42,35.826 L57.42,19.26 C57.42,17.373 56.723,16.535 54.556,16.535 L52.249,16.535 L52.249,12.133 L67.322,12.133 L67.322,35.617 C67.322,39.576 69.465,41.322 72.728,41.322 C75.406,41.322 78.085,40.137 79.53,37.432 L79.53,19.26 C79.53,17.373 78.831,16.535 76.665,16.535 L74.219,16.535 L74.219,12.133 L89.433,12.133 L89.433,36.732 C89.433,39.182 90.341,40.299 93.136,40.299 L93.626,40.299 L93.626,44.842 L80.02,47.008 L80.02,42.326 L79.74,42.326 C77.108,45.539 73.404,47.707 68.115,47.707 C62.174,47.707 57.42,44.703 57.42,35.826" id="Fill-2"/>
                                        <path d="M113.415,43.305 C118.774,43.305 120.81,38.643 120.917,29.256 C121.021,20.074 118.774,15.629 113.415,15.629 C108.733,15.629 105.797,20.076 105.797,29.256 C105.797,38.645 108.685,43.305 113.415,43.305 L113.415,43.305 Z M113.415,47.707 C103.724,47.707 94.985,40.297 94.985,29.256 C94.985,18.422 103.513,11.223 113.415,11.223 C123.736,11.223 132.007,18.56 132.007,29.256 C132.007,40.297 123.736,47.707 113.415,47.707 L113.415,47.707 Z" id="Fill-3"/>
                                        <path d="M132.319,47.008 L132.319,42.605 L133.787,42.605 C137.422,42.605 137.771,41.557 137.771,38.412 L137.771,19.26 C137.771,17.373 136.793,16.535 134.557,16.535 L132.6,16.535 L132.6,12.133 L146.414,12.133 L147.113,19.332 L147.394,19.332 C148.932,14.158 153.055,11.432 156.921,11.432 C160.113,11.432 162.605,13.25 162.605,16.932 C162.605,19.494 161.373,22.221 157.924,22.221 C154.824,22.221 154.22,20.123 151.656,20.123 C149.374,20.123 147.602,22.291 147.602,25.481 L147.602,38.412 C147.602,41.557 148.372,42.605 151.937,42.605 L153.963,42.605 L153.963,47.008 L132.319,47.008" id="Fill-4"/>
                                        <path d="M178.307,41.883 C182.711,41.883 184.527,37.713 184.527,33.522 L184.527,27.928 C181.313,31.258 173.833,31.375 173.833,37.316 C173.833,40.228 175.559,41.883 178.307,41.883 L178.307,41.883 Z M184.738,41.859 C182.92,45.353 179.191,47.707 173.974,47.707 C167.917,47.707 164.003,44.49 164.003,38.83 C164.003,27.44 179.868,30.467 184.527,22.92 L184.527,22.103 C184.527,16.303 182.244,15.395 179.728,15.395 C172.669,15.395 175.883,22.986 169.383,22.986 C166.262,22.986 165.05,21.102 165.05,18.982 C165.05,14.695 170.176,11.223 179.799,11.223 C188.906,11.223 194.499,13.74 194.499,22.803 L194.499,37.27 C194.499,39.506 195.315,40.719 197.272,40.719 C198.11,40.719 198.809,40.486 199.344,40.113 L200.51,42.953 C199.554,44.422 197.014,47.008 192.191,47.008 C187.999,47.008 185.366,45.051 185.016,41.859 L184.738,41.859 L184.738,41.859 Z" id="Fill-5" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <h2>Sign Up</h2>
                        <div className='inputArea'>
                            <div className="formElem">
                                <input type='text' name='userName' className="textfield" value={this.state.userName} onChange={this.handleChange} />
                                <label>Username</label>
                                <p className='error'>{this.state.error.userName}</p>
                            </div>
                            <div className="formElem">
                                <input type='email' name='email' className="textfield" value={this.state.email} onChange={this.handleChange} />
                                <label>Email</label>
                                <p className='error'>{this.state.error.email}</p>
                            </div>
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
                                <input type='password' name='password' className="textfield" value={this.state.password} onChange={this.handleChange} />
                                <label>Password</label>
                                <p className='error'>{this.state.error.password}</p>
                            </div>
                            <div className="formElem">
                                <input type='password' name='confpassword' className="textfield" value={this.state.confpassword} onChange={this.handleChange} />
                                <label>Confirm Password</label>
                                <p className='error'>{this.state.error.confpassword}</p>
                            </div>
                        </div>
                        <input type="submit" className='Button' value="Sign Up" />
                        <p>Have an account? <a href="/login">Login!</a></p>
                    </form>
                </div>
            )
        }
    }
}

export default SignUp;