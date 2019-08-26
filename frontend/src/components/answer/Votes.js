import React, { Component } from "react";
import AnswerService from "../answer/answer.service";
import FeedService from "../home/feed.service";
export default class Votes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: "",
      upvotes: 0,
      downvoted: false,
      upvoted: false,
      comment: ""
    };

    this.getAnswer = this.getAnswer.bind(this);
    this.toggleVote = this.toggleVote.bind(this);
  }

  getAnswer = () => {
    FeedService.getAnswer(this.props.answer._id, result => {
      this.setState({
        answer: result.answer,
        upvotes: result.upvotes,
        upvoted: result.upvoted,
        downvoted: result.downvoted
      });
    });
  };

  toggleVote = event => {
    AnswerService.Vote(
      this.props.answer._id,
      event === "upvote" ? "true" : "false",
      resp => {
        let state = this.state;
        if (event === "upvote") {
          if (state.downvoted) {
            state.downvoted = false;
          }
          state.upvoted = !state.upvoted;
        }
        if (event === "downvote") {
          if (state.upvoted) {
            state.upvoted = false;
          }
          state.downvoted = !state.downvoted;
        }
        state.upvotes = resp;
        this.setState(state);
      }
    );
  };
  render() {
    return (
      <div style={{ height: "8px" }}>
        <div className="actionBar">
          <span>
            <a onClick={() => this.toggleVote("upvote")} className="upvote">
              <div className="innerdiv">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g
                    strokeWidth="1.5"
                    stroke="#329bff"
                    fill={this.state.upvoted ? "#329bff" : "none"}
                    fillRule="evenodd"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 4 3 15 9 15 9 20 15 20 15 15 21 15" />
                  </g>
                </svg>
                <div className="upvoteLabeldiv">
                  <span className="upvoteLabel">Upvote</span>
                  <span className="upvoteCount">
                    <span className="bullet"> · </span>
                    <span>{this.state.upvotes}</span>
                  </span>
                </div>
              </div>
            </a>
          </span>
          <span>
            <a
              onClick={() => this.toggleVote("downvote")}
              name="downvote"
              className="downvote"
            >
              <div className="innerdiv">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g
                    strokeWidth="1.5"
                    stroke="#666"
                    fill={this.state.downvoted ? "#329bff" : "none"}
                    fillRule="evenodd"
                    strokeLinejoin="round"
                  >
                    <polygon
                      transform="translate(12.000000, 12.000000) rotate(-180.000000) translate(-12.000000, -12.000000) "
                      points="12 4 3 15 9 15 9 20 15 20 15 15 21 15"
                    />
                  </g>
                </svg>
              </div>
            </a>
          </span>
        </div>
      </div>
    );
  }
}
