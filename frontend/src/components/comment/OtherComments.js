import React, { Component } from "react";
import constants from "../../utils/constants";
import { Link, withRouter } from "react-router-dom";
import avatar from "../../assets/avatar.jpeg";
import axios from "axios";
import AnswerService from "../answer/answer.service";
import changeDate from "../question/Date";
class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newcomment: "",
      comment: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.comment = this.comment.bind(this);
  }
  componentDidMount() {
    this.getLatestComment();
  }

  getLatestComment = () => {
    console.log("checking answer propid", this.props.answer._id);

    AnswerService.getComments(this.props.answer._id, resp => {
      if (resp.length > 0) {
        console.log(resp);
        resp.sort((a, b) => {
          return a.date > b.date ? -1 : 1;
        });
        let state = this.state;
        state.comment = [];
        resp.forEach(element => {
          let temp = {};
          temp.answerID = element.answerID;
          temp.comment = element.comment;
          temp.user = element.userID
            ? element.userID.firstName + " " + element.userID.familyName
            : "Anonymous User";
          temp.userID = element.userID ? element.userID._id : 0;
          temp.date = element.date;
          temp._id = element._id;
          state.comment.push(temp);
        });
        this.setState(state);
      }
    });
  };

  handleChange = event => {
    this.setState({ newcomment: event.target.innerText });
  };

  comment = () => {
    AnswerService.addComment(
      this.props.answer._id,
      this.state.newcomment,
      resp => {
        this.getLatestComment();
        this.setState({ newcomment: "" });
        document.getElementById("commentfield").innerHTML = "";
      }
    );
  };

  render() {
    let comments;
    if (this.state.comment != null) {
      comments = this.state.comment.map(data => {
        console.log("getting comments", data);

        return (
          <div>
            <div style={{ position: "relative" }}>
              <div style={{ padding: "8px 8px 0 0" }}>
                <div className="contentHeader commentHeader">
                  <div className="u-flex">
                    <div className="u-flex-none feed-reply-avatar">
                      <img src={avatar} width="32" height="32" />
                    </div>
                    <div className="authorCreds">
                      <div className="author">
                        {data.userID !== 0 && (
                          <a href="/" className="name">
                            {data.user}
                          </a>
                        )}
                        {data.userID === 0 && (
                          <span className="name">{data.user}</span>
                        )}
                        <span>
                          <a
                            className="dateStamp"
                            href={
                              "/question/" +
                              this.props.answer.questionID._id +
                              "/answer/" +
                              this.props.answer._id +
                              "/comment/" +
                              data.comment._id
                            }
                          >
                            Commented {changeDate(data.date)}
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="commentBody">{data.comment}</div>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div className="answerTab_feed">
        <div className="u-flex">
          <div className="feed-reply-avatar">
            <img src={avatar} width="32" height="32" />
          </div>
          <div className="feed-reply-box">
            <div className="u-flex">
              <div className="editor-wrapper">
                <div
                  placeholder="Add a comment..."
                  id="commentfield"
                  className={"Editor " + (this.state.newcomment ? "" : "empty")}
                  onKeyUp={this.handleChange}
                />
                <div className="addComment">
                  <a href="#" onClick={this.comment}>
                    Add Comment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>{comments}</div>
      </div>
    );
  }
}
export default Comments;

// {this.state.comment && (
// <div>
//   <div style={{ position: "relative" }}>
//     <div style={{ padding: "8px 8px 0 0" }}>
//       <div className="contentHeader commentHeader">
//         <div className="u-flex">
//           <div className="u-flex-none feed-reply-avatar">
//             <img src={avatar} width="32" height="32" />
//           </div>
//           <div className="authorCreds">
//             <div className="author">
//               {this.state.comment.userID !== 0 && (
//                 <a href="/" className="name">
//                   {this.state.comment.user}
//                 </a>
//               )}
//               {this.state.comment.userID === 0 && (
//                 <span className="name">
//                   {this.state.comment.user}
//                 </span>
//               )}
//               <span>
//                 <a
//                   className="dateStamp"
//                   href={
//                     "/question/" +
//                     this.props.answer.questionID._id +
//                     "/answer/" +
//                     this.props.answer._id +
//                     "/comment/" +
//                     this.state.comment._id
//                   }
//                 >
//                   Commented {date}
//                 </a>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="commentBody">{this.state.comment.comment}</div>
//     </div>
//   </div>
// </div>
// )}
