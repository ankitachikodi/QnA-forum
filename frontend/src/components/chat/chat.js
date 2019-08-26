import React, { Component } from "react";
import ChatService from "./chat.service";
import $ from "jquery"; 
import { decode } from "jsonwebtoken";
import Constants from "../../utils/constants";

export default class Chat extends Component {
    constructor() {
        super();
        this.state = {
          left_chat: [],
          right_chat: [],
          all_data: [],
          current_messages: [],
          myself : -1,
          current_user: -1
        };
        this.myUserId = this.myUserId.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
      console.log("test");
      let myself = this.myUserId();
      let left_ar = [];
      let right_ar = [];
      ChatService.getAll((data) => {
        console.log(data);
        if (data["status"] && data["status"]["payLoad"].length>0){
          this.setState({
            all_data: data["status"]["payLoad"],
            myself,
            current_user:
              myself ==
                data["status"]["payLoad"][0]["first_participant"] ? data["status"]["payLoad"][0]["second_participant"] : data["status"]["payLoad"][0]["first_participant"]
          });

        }
        else{
          this.setState({
            myself
          })
        }
      });
    }

  myUserId() {
    return decode(localStorage.getItem(Constants.tokenName)).user.toString()
  }

  handleClick(a){
    console.log(a);
    //alert("asd")
    let myself = this.state.myself;
    if(a["history"].length){
      this.setState({
        current_messages: a["history"],
        current_user: myself ==
          a["first_participant"] ? a["second_participant"] : a["first_participant"]
      });
    }
    
  }

  handleSubmit(t){
    console.log(t);
    console.log(this.state);
    ChatService.put(this.state.current_user, document.getElementById("addmessagetxt").value,(data)=>{
      
      let myself = this.myUserId();
      let left_ar = [];
      let right_ar = [];
      ChatService.getAll((data) => {
        console.log(data);
        if (data["status"]) {
          this.setState({
            all_data: data["status"]["payLoad"],
            myself,
            current_user:
              myself ==
                data["status"]["payLoad"][0]["first_participant"] ? data["status"]["payLoad"][0]["second_participant"] : data["status"]["payLoad"][0]["first_participant"]
          });

        }
        else {
          this.setState({
            myself
          })
        }
      });


    });
  }

    render() {

      console.log(this.state);
    return (
      <div>
        <div>
          Chat
          <div className="container-chat">
            <div className="left-chat-message">
              {this.state.all_data.map((item, key) => (
                //if(item.first_participant)
                <div
                  className="left-elements"
                  onClick={() => this.handleClick(item)}
                  key={item.id}
                >
                  {item.name}
                </div>
              ))}
            </div>
            <div className="right-chat-message">
              {this.state.current_messages.map((item, key) => {

                if(this.state.myself == item["sender"]){
                  return (
                    <div
                      className="left-elements1 sender common_class"
                      //onClick={() => this.handleClick(item)}
                      key={item.id}
                    >
                      {item.body}
                      <div className="crtd">
                        {item.createdAt}
                      </div>
                    </div>
                  );
                }
                else{
                  return (
                    <div
                      className="right-elements rec common_class"
                      //onClick={() => this.handleClick(item)}
                      key={item.id}
                    >
                      {item.body}
                      <div className="crtd">
                        {item.createdAt}
                      </div>

                    </div>
                  );
                }

              })}
            </div>
            <div className="addNewMessage">
              <textarea id="addmessagetxt">

              </textarea>
              <button type="button" className="submitButton" onClick={this.handleSubmit}>
                Send
              </button>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}
