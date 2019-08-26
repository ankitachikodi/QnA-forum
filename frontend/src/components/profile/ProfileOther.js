import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import Constants from "../../utils/constants";
import feedBar from "../feedBar/feedBar";
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import './profileother.css';

class ProfileOther extends Component {

    constructor(props) {
        super();
        this.state =
            {
                userid: props.match.params.userid,
                firstname: '',
                middleName: '',
                lastname: '',
                credentials: '',
                career: '',
                education: '',
                city: '',
                state: '',
                email: '',
                bio: '',
                zip:'',
                questions: [],
                answers: [],
                followers: [],
                following: [],
                bookmark: [],
                isme: true,
                isfollow: false,

            };
        this.connectUser = this.connectUser.bind(this);
    }
    componentDidMount() {
        let state = this.state;
        console.log("In component profile other")
        state.isme = decode(localStorage.getItem(Constants.tokenName)).user.toString() === this.props.match.params.userid
        if(!state.isme){
            axios.get(Constants.apiUrl+'users/isfollowuser?userid='+this.props.match.params.userid+'&token=' + localStorage.getItem(Constants.tokenName))
            .then(res => {
                console.log("Is follow: ", res.data);
                this.setState({ isfollow: res.data.isfollow })
            });
        }
        axios.get(Constants.apiUrl+'users/profileother?userid='+this.props.match.params.userid+'&token=' + localStorage.getItem(Constants.tokenName))
            .then(res => {
                let user = res.data;
                console.log("return1 -----", user)
                if (res.status == 200) {
                    state.firstname = user.firstName;
                    state.middleName = user.middleName;
                    state.lastname = user.familyName;
                    state.credentials = user.credentials;
                    state.career = user.career;
                    state.education = user.education;
                    state.city =  user.city;
                    state.state = user.state;
                    state.zip = user.zip;
                    state.email = user.email;
                    state.bio = user.bio;
                }
                axios.get(Constants.apiUrl+'users/contentother?userid='+this.props.match.params.userid+'&token=' + localStorage.getItem(Constants.tokenName))
                .then(res => {
                    console.log("return2 -----", res)
                    state.questions = res.data[0];
                    state.answers = res.data[1];
                    state.followers = res.data[2];
                    state.following = res.data[3];
                    state.bookmark = res.data[4];
                    this.setState(state);
                });
            });
    }

    editButtonHandler = (e) => {
        e.preventDefault();
        this.props.history.push('/updateProfile');

    }

    handleClick(type) {
        console.log('The link was clicked.');
        this.setState({ show: type });
      };

    followUser = (e) => {
        e.preventDefault();
        let data = {
            token: localStorage.getItem(Constants.tokenName),
            followedId: this.props.match.params.userid
        }
        axios.post(Constants.apiUrl+'users/follow',data)
            .then(res => {
                this.setState({ isfollow: !this.state.isfollow });
            });
    }

    // followUser = (e) => {
    //     e.preventDefault();
    //     this.setState({ isfollow: !this.state.isfollow });
    //     let data = {
    //         token: localStorage.getItem(Constants.tokenName),
    //         followedId: this.props.match.params.userid
    //     }
    //     axios.post(Constants.apiUrl+'users/follow',data)
    //         .then(res => {
    //             console.log("follow2",res);
    //         });
    // }

    createContent() {
        if (this.state.show === 'Questions') {
            return (
                this.state.questions.map(v => {
                    return v.question;
                })
            );
        } else if (this.state.show === 'Answers') {
            return (
                this.state.answers.map((i) => {
                    return i.answer;
                })
            )
        } else if (this.state.show === 'Followers') {
            return (
                this.state.followers.map((i) => {
                    return(<Link to={`/profileother/${i.followerID._id}`} onClick={() => window.location.refresh()}>
                        <p>{i.followerID.firstName} {i.followerID.familyName}</p>
                        <p className="cred">{i.followerID.credentials}</p>
                    </Link>);
                })
            )
        } else if (this.state.show === 'Following') {
            return (
                this.state.following.map((i) => {
                    return(
                        <Link to={`/profileother/${i.followedID._id}`} onClick={() => window.location.refresh()}>
                            <p>{i.followedID.firstName} {i.followedID.familyName}</p>
                            <p className="cred">{i.followedID.credentials}</p>
                        </Link>
                    );
                })
            )
        } else if (this.state.show === 'Bookmarked Answers') {
            return (
                this.state.bookmark.map((i) => {
                    return i.answerID.answer;
                })
            )
        } else if(this.state.show === 'Profile'){
            return(
                <div>Profile</div>
            )
        }else {
            return null;
        }
    }
    
    connectUser() {

        axios
            .post(Constants.apiUrl + "chat/put", {
                token: localStorage.getItem(Constants.tokenName),
                sender: decode(
                    localStorage.getItem(Constants.tokenName)
                ).user.toString(),
                receiver: this.state.userid,
                text: "You are now connected"
            })
            .then(resp => {
                //callback(resp.data);
                //Redirect
                this.props.history.push("/chat");
            });
    }

    render() {
        let content = [];
        if(this.state.show && this.state.show !=='Profile'){
            content.push(<div key='header'><h4>{this.state.show}</h4></div>)
            this.createContent().forEach((item,i) => {
                content.push(
                    <div key={i} className='tile'>
                        {item}
                    </div>
                )
            })
        }else if(this.state.show === 'Profile'){
            console.log(this.state);
            content = (
                <div>
                    <h4>{this.state.show}</h4>
                    <div className='tile'>Name: {this.state.firstname + ' ' + (this.state.middleName ? this.state.middleName : '') + ' ' + this.state.lastname}</div>
                    <div className='tile'>Email: {this.state.email}</div>
                    <div className='tile'>Location: {this.state.city + ', ' + this.state.state + ', ' + (this.state.zip ? this.state.zip : '')}</div>
                    <div className='tile'>Education: {this.state.education}</div>
                    <div className='tile'>Career: {this.state.career}</div>
                    <div className='tile'>Credentials: {this.state.credentials}</div>
                </div>
            );
        }
        return (
            <div className='body'>
                <div className="row top-padding">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h3>{this.state.firstname+" "+this.state.lastname}</h3>
                        <h5 className='greytext'>{this.state.city+", "+this.state.state}</h5>
                        <h5 className='greytext'>{this.state.credentials}</h5>
                    </div>
                    <div className="col-md-2">
                        <div>
                            {this.state.isfollow && <div><button onClick = {this.followUser}  className="btn btn-success" type="submit"> Following </button><button onClick={this.connectUser} className="btn btn-danger" type="submit"> Message </button></div>}
                            {!this.state.isme && <div><button onClick = {this.followUser}  className="btn btn-success" type="submit"> Follow </button><button onClick={this.connectUser} className="btn btn-danger" type="submit"> Message </button></div>}
                            {this.state.isme && <button onClick = {this.editButtonHandler}  className="btn btn-success" type="submit"> Edit Profile </button>}
                        </div>
                    </div>
                    <div className="col-md-1">
                    </div>
                </div>
                <hr />

                <div className='sidebar'>
                    <ul>
                        <div className='label'>Feeds</div>
                        <li className={'sidebar-item' + (this.state.show === 'Profile' ? ' active' : '')}>
                            <a><div onClick={() => this.handleClick("Profile")} className='label'>Profile</div></a>
                        </li>
                        <li className={'sidebar-item' + (this.state.show === 'Questions' ? ' active' : '')}>
                            <a><div onClick={() => this.handleClick("Questions")} className='label'>Questions</div></a>
                        </li>
                        <li className={'sidebar-item' + (this.state.show === 'Answers' ? ' active' : '')}>
                            <a><div onClick={() => this.handleClick("Answers")} className='label'>Answers</div></a>
                        </li>
                        <li className={'sidebar-item' + (this.state.show === 'Followers' ? ' active' : '')}>
                            <a><div onClick={() => this.handleClick("Followers")} className='label'>Followers</div></a>
                        </li>
                        <li className={'sidebar-item' + (this.state.show === 'Following' ? ' active' : '')}>
                            <a><div onClick={() => this.handleClick("Following")} className='label'>Following</div></a>
                        </li>
                        <li className={'sidebar-item' + (this.state.show === 'Bookmarked Answers' ? ' active' : '')}>
                            <a><div onClick={() => this.handleClick("Bookmarked Answers")} className='label'>Bookmarked Answers</div></a>
                        </li>
                    </ul>
                </div>
                <div className='main-body'>
                    {content}
                </div>
            </div>
        );
    }
}

export default ProfileOther;