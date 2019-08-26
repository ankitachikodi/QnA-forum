import React, { Component } from "react";
import constants from "../../utils/constants";
import { Link, withRouter } from "react-router-dom";
import avatar from "../../assets/avatar.jpeg";
import axios from "axios";
import QuestionService from "../question/question.service";
import Comments from "../comment/OtherComments";
import changeDate from "./Date";
import Votes from "../answer/Votes";
import Answer from "../answer/Answer";
export default class QuestionAnswerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      question: [],
      topic: "",
      followed: "",
      follows: "",
      showAnswer: false
    };
    // this.handleFollow = this.handleFollow.bind(this);
    this.getAnswer();
    this.popAnswer = this.popAnswer.bind(this);
  }
  popAnswer() {
    this.setState({ showComponent: true });
  }
  getAnswer() {
    axios
      .get(constants.apiUrl + "answer/getanswers", {
        params: {
          questionID: this.props.match.params.id
        }
      })
      .then(data => {
        this.setState({
          question: data.data.result.question,
          topic: data.data.result.question.topicID.topicName,
          answers: data.data.result.answer
        });
      })
      .catch(err => console.log(err));
  }
  toggleFollow = () => {
    console.log("Toggle");
    QuestionService.Follow(this.state.question._id, resp => {
      if (resp !== false) {
        console.log(resp);
        this.state.followed =
          this.state.followed === undefined ? true : !this.state.followed;
        this.state.follows = resp;
        this.forceUpdate();
      }
    });
  };
  render() {
    let answer;

    if (this.state.answers != null) {
      answer = this.state.answers.map(singleAnswer => {
        console.log("single answerssss", singleAnswer);
        return (
          <div
            key={singleAnswer._id}
            style={{ paddingTop: "5px", background: "#fafafa" }}
            className="card w-50 border-0"
          >
            <div className="card-body">
              <div>
                <div className="contentHeader answerHeader">
                  <div className="u-flex">
                    <div className="u-flex-none photo">
                      <img src={avatar} />
                    </div>
                    <div className="authorCreds">
                      <div className="author">
                        {singleAnswer.ownerID && (
                          <div className="name">
                            <Link
                              to={`/profileother/${singleAnswer.ownerID._id}`}
                            >
                              {singleAnswer.ownerID.firstName +
                                " " +
                                singleAnswer.ownerID.familyName}
                            </Link>
                            <span>
                              {singleAnswer.ownerID.credentials
                                ? ", " + singleAnswer.ownerID.credentials
                                : ""}
                            </span>
                          </div>
                        )}
                        {!singleAnswer.ownerID && (
                          <div className="name">Anonymous User</div>
                        )}
                        <span>
                          <a
                            className="dateStamp"
                            href={
                              "/question/" +
                              singleAnswer.questionID._id +
                              "/answer/" +
                              singleAnswer.answer._id
                            }
                          >
                            Answered on {changeDate(singleAnswer.date)}
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-text">{singleAnswer.answer}</div>
              <div style={{ padding: "10px" }}>
                <Votes answer={singleAnswer} />
              </div>

              <div style={{ paddingTop: "10px" }} />
              <div className="">
                <Comments key={singleAnswer._id} answer={singleAnswer} />
              </div>
            </div>

            <hr />
          </div>
        );
      });
    }
    console.log("only questions", this.state.question);
    return (
      <div className="container">
        <div style={{ paddingTop: "20px" }}>
          <div style={{ background: "#fafafa" }} className="card w-50 border-0">
            <div className="card-body">
              <div style={{ paddingBottom: "5px" }} className="topics">
                <span className="badge badge-dark">{this.state.topic}</span>
              </div>

              <h2 className="card-title">{this.state.question.question}</h2>
              <p className="card-text">
                {/* <Comments answer={this.state.answers} /> */}

                <div className="action-bar">
                  <div className="action-bar-inner u-flex">
                    <div className="action-button">
                      <div>
                        <span>
                          <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <g
                              id="answer"
                              transform="translate(2.500000, 3.500000)"
                              stroke="none"
                              strokeWidth="1.5"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <g
                                id="pen"
                                transform="translate(9.000000, 9.000000) rotate(-315.000000) translate(-9.000000, -9.000000) translate(7.000000, -1.000000)"
                              >
                                <path
                                  d="M2,8.8817842e-16 L2,8.8817842e-16 L2,8.8817842e-16 C3.1045695,6.85269983e-16 4,0.8954305 4,2 L4,16 L2.00256278,20 L0,16 L0,2 L0,2 C-1.35267774e-16,0.8954305 0.8954305,1.09108686e-15 2,8.8817842e-16 Z"
                                  id="pen_body"
                                  stroke="#329bff"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <polygon
                                  fill="#666"
                                  transform="translate(2.000000, 18.750000) scale(1, -1) translate(-2.000000, -18.750000) "
                                  points="2 17.5 3.25 20 0.75 20"
                                />
                              </g>
                              <path
                                d="M12,16 L17,16 L17,11 M7,1 L2,1 L2,6"
                                stroke="#329bff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                          </svg>
                        </span>
                        <div>
                          <div
                            onClick={this.popAnswer}
                            className="action-button-text"
                          >
                            Answer
                          </div>
                          {this.state.showComponent ? (
                            <Answer question={this.state.question._id} />
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="action-button">
                      <a onClick={this.toggleFollow}>
                        <span>
                          <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <g
                              stroke="none"
                              fill="none"
                              fillRule="evenodd"
                              strokeLinecap="round"
                            >
                              <g
                                stroke={
                                  this.state.question.followed
                                    ? "#329bff"
                                    : "#666"
                                }
                                strokeWidth="1.5"
                              >
                                <path
                                  d="M14.5,19 C14.5,13.3369229 11.1630771,10 5.5,10 M19.5,19 C19.5,10.1907689 14.3092311,5 5.5,5"
                                  id="lines"
                                />
                                <circle
                                  id="circle"
                                  cx="7.5"
                                  cy="17"
                                  r="2"
                                  fill="none"
                                />
                              </g>
                            </g>
                          </svg>
                        </span>
                        {/* <div
                          className="action-button-text"
                          style={{
                            color: this.state.followed ? "#329bff" : "#666"
                          }}
                        >
                          Follow
                          {this.props.question.follows ||
                          this.props.question.follows > 0
                            ? " · " + this.props.question.follows
                            : ""}
                        </div> */}
                      </a>
                    </div>
                  </div>
                </div>
              </p>
              <h5> {this.state.answers.length} Answers</h5>
              <hr />
            </div>
          </div>
        </div>

        <div>{answer}</div>
      </div>
    );
  }
}
