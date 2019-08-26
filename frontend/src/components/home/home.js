import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import TopicService from "../topic/topic.service";
import feedlogo from "../../assets/feed.png";
import FeedService from "./feed.service";
import avatar from "../../assets/avatar.png";
import AnswerService from "../answer/answer.service";
import QuestionService from "../question/question.service";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: {
        question: [],
        answer: []
      },
      follows: {
        topics: []
      },
      page: {
        answer: 0,
        question: 0
      },
      redirect: ""
    };
    this.getTopics();
    this.getFeed();
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  getFeed = () => {
    let state = this.state;
    FeedService.getFeed(this.props.match.params.id, result => {
      state.feed.answer = result.answers;
      state.feed.question = result.questions;
      this.setState(state);
    });
  };

  getTopics = () => {
    let state = this.state;
    TopicService.getTopics(resp => {
      if (
        resp.topics.filter(v => {
          return v.followed === true;
        }).length === 0
      ) {
        state.redirect = true;
      } else {
        resp.topics.forEach(v1 => {
          state.follows.topics.push(v1);
        });
        state.redirect = false;
      }
      this.setState(state);
    });
  };

  nextPage = section => {
    let state = this.state;
    if (state.page[section] < Math.ceil(state.feed[section].length / 4) - 1) {
      state.page[section]++;
    }
    this.setState(state);
  };

  previousPage = section => {
    let state = this.state;
    if (state.page[section] > 0) {
      state.page[section]--;
    }
    this.setState(state);
  };

  render() {
    console.log(this.state);
    if (this.state.redirect === true) {
      return <Redirect to="topics" />;
    } else if (this.state.redirect === false) {
      let follows = [];
      let answers = [];
      let questions = [];
      let answerpage = this.state.feed.answer.slice(
        this.state.page.answer * 4,
        this.state.page.answer * 4 + 4
      );
      let questionpage = this.state.feed.question.slice(
        this.state.page.question * 4,
        this.state.page.question * 4 + 4
      );
      answerpage.forEach(answer => {
        let topic = this.state.follows.topics.filter(v => {
          return v._id === answer.questionID.topicID;
        })[0];
        answers.push(
          <AnswerTile
            key={answer._id}
            topic={topic.topicName}
            answer={answer}
          />
        );
      });
      questionpage.forEach(question => {
        let topic = this.state.follows.topics.filter(v => {
          return v._id === question.topicID;
        })[0];
        questions.push(
          <QuestionTile
            topic={topic.topicName}
            question={question}
            key={question._id}
          />
        );
      });
      this.state.follows.topics.forEach(topic => {
        if (topic.followed) {
          follows.push(
            <li
              className={
                "sidebar-item" +
                (this.props.match.params.id === topic._id ? " active" : "")
              }
              key={topic._id}
            >
              <a href={"/topic/" + topic._id}>
                <div
                  className={
                    "sidebar-item-image" +
                    (this.props.match.params.id === topic._id ? " active" : "")
                  }
                >
                  <img src={feedlogo} width="14" height="14" />
                </div>
                <div className="label">{topic.topicName}</div>
              </a>
            </li>
          );
        }
      });
      let totalAnswerPages = Math.ceil(this.state.feed.answer.length / 4);
      let totalQuestionPages = Math.ceil(this.state.feed.question.length / 4);
      return (
        <div className="body" ref={this.href}>
          <div className="sidebar">
            <ul>
              <li
                key="feed"
                className={
                  "sidebar-item" +
                  (this.props.match.params.id === undefined ? " active" : "")
                }
              >
                <a href="/">
                  <div
                    className={
                      "sidebar-item-image" +
                      (this.props.match.params.id === undefined
                        ? " active"
                        : "")
                    }
                  >
                    <img src={feedlogo} width="14" height="14" />
                  </div>
                  <div className="label">Feed</div>
                </a>
              </li>
              {follows}
            </ul>
          </div>
          <div className="main-body">
            {answers}
            <div style={{ margin: "5px 0" }}>
              <button
                className="Button"
                onClick={() => this.previousPage("answer")}
              >
                Previous
              </button>
              <span className="PageDetails">
                {"Page: " +
                  (this.state.page.answer + 1) +
                  "/" +
                  totalAnswerPages}
              </span>
              <button
                className="Button"
                onClick={() => this.nextPage("answer")}
              >
                Next
              </button>
            </div>
            <div className="question-feed">
              <div>
                <div className="question-feed-header">
                  <div className="question-feed-header-icon">
                    <span className="question-feed-header-icon-span">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 28 28"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <g
                          stroke="#fff"
                          strokeWidth="1.5"
                          fill="none"
                          fillRule="evenodd"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15.0037473,18.5 C15.0037473,16.7206263 15.0037473,15.8306263 15.0037473,15.83 C17.3666743,14.7057707 19,12.2909208 19,9.5 C19,5.63400675 15.8659932,2.5 12,2.5 C8.13400675,2.5 5,5.63400675 5,9.5 C5,12.2916985 6.63423594,14.7017006 8.99822794,15.8255267 C8.99822794,15.8255267 8.99822794,16.7170178 8.99822794,18.5 L15.0037473,18.5 Z M12,8 L10,11 L14,11 L12,14 M9.76460414,20.5003969 C10.3139024,21.1136855 11.1118833,21.4996031 12,21.4996031 C12.886481,21.4996031 13.6831579,21.1151057 14.2323583,20.5037832" />
                        </g>
                      </svg>
                    </span>
                  </div>
                  <div className="question-feed-header-text">
                    Questions for You
                  </div>
                </div>
              </div>
              {questions}
              <div style={{ margin: "5px 0" }}>
                <button
                  className="Button"
                  onClick={() => this.previousPage("question")}
                >
                  Previous
                </button>
                <span className="PageDetails">
                  {"Page: " +
                    (this.state.page.question + 1) +
                    "/" +
                    totalQuestionPages}
                </span>
                <button
                  className="Button"
                  onClick={() => this.nextPage("question")}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

class AnswerTile extends Component {
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
    console.log(this.state);
    let answerLen = this.props.answer.answer.length;
    let answer = "";
    if (this.props.answer.answer.length > 330) {
      answer = this.props.answer.answer.substr(0, 330) + "...";
    } else {
      answer = this.props.answer.answer;
    }
    let date = "";
    let newDate = new Date(this.props.answer.date);
    let timeDiff = Date.now() / 1000 - newDate.getTime() / 1000;
    if (timeDiff < 86400) {
      if (timeDiff < 3600) {
        if (timeDiff < 60) {
          date = Math.ceil(timeDiff) + "s ago";
        } else {
          date = Math.ceil(timeDiff / 60) + "min ago";
        }
      } else {
        date = Math.ceil(timeDiff / 3600) + "h ago";
      }
    } else if (timeDiff < 604800) {
      date = Math.ceil(timeDiff / 86400) + " days ago";
    } else {
      date = newDate.toString().split(" ")[1] + " " + newDate.getDate();
    }
    return (
      <div className="tile">
        <div className="tileHeader">Answer · {this.props.topic}</div>
        <span>
          <Link
            to={`question/singleQuestion/${this.props.answer.questionID._id}`}
            className="questionHeader"
          >
            {this.props.answer.questionID.question}
          </Link>
          {/* <a href='/' className='questionHeader'>{this.props.answer.questionID.question}</a> */}
          <div>
            <div className="contentHeader answerHeader">
              <div className="u-flex">
                <div className="u-flex-none photo">
                  <img src={avatar} />
                </div>
                <div className="authorCreds">
                  <div className="author">
                    {this.props.answer.ownerID && (
                      <a href="/" className="name">
                        {this.props.answer.ownerID.firstName +
                          " " +
                          this.props.answer.ownerID.familyName}
                        <span>
                          {this.props.answer.ownerID.credentials
                            ? ", " + this.props.answer.ownerID.credentials
                            : ""}
                        </span>
                      </a>
                    )}
                    {!this.props.answer.ownerID && (
                      <div className="name">Anonymous User</div>
                    )}
                    <span>
                      <a
                        className="dateStamp"
                        href={
                          "/question/" +
                          this.props.answer.questionID._id +
                          "/answer/" +
                          this.props.answer._id
                        }
                      >
                        Answered {date}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {!this.state.answer && (
                <div className="answerPreview" onClick={this.getAnswer}>
                  <div className="answerText">
                    {answer}
                    <span className="more">
                      {answerLen > 330 ? (
                        <a
                          href={
                            "/question/" +
                            this.props.answer.questionID._id +
                            "/answer/" +
                            this.props.answer._id
                          }
                        >
                          (more)
                        </a>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </div>
              )}
              {this.state.answer && (
                <div>
                  <div className="answer">{this.state.answer}</div>
                  <div style={{ height: "8px" }} />
                  <div className="actionBar">
                    <span>
                      <a
                        onClick={() => this.toggleVote("upvote")}
                        className="upvote"
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
                  <Comments answer={this.props.answer} />
                </div>
              )}
            </div>
          </div>
        </span>
      </div>
    );
  }
}

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
    AnswerService.getComments(this.props.answer._id, resp => {
      if (resp.length > 0) {
        resp.sort((a, b) => {
          return a.date > b.date ? -1 : 1;
        });
        let state = this.state;
        state.comment = {};
        state.comment.answerID = resp[0].answerID;
        state.comment.comment = resp[0].comment;
        state.comment.user = resp[0].userID
          ? resp[0].userID.firstName + " " + resp[0].userID.familyName
          : "Anonymous User";
        state.comment.userID = resp[0].userID ? resp[0].userID._id : 0;
        state.comment.date = resp[0].date;
        state.comment._id = resp[0]._id;
        this.setState(state);
      }
    });
  };

  handleChange = event => {
    if (event.target.value.trim() === "") {
      document.getElementById("adCommentBtn").style.display = "none";
    } else {
      document.getElementById("adCommentBtn").style.display = "inline-block";
    }
    this.setState({ newcomment: event.target.value });
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
    let date = "";
    if (this.state.comment) {
      let newDate = new Date(this.state.comment.date);
      let timeDiff = Date.now() / 1000 - newDate.getTime() / 1000;
      if (timeDiff < 86400) {
        if (timeDiff < 3600) {
          if (timeDiff < 60) {
            date = Math.ceil(timeDiff) + "s ago";
          } else {
            date = Math.ceil(timeDiff / 60) + "min ago";
          }
        } else {
          date = Math.ceil(timeDiff / 3600) + "h ago";
        }
      } else if (timeDiff < 604800) {
        date = Math.ceil(timeDiff / 86400) + " days ago";
      } else {
        date = newDate.toString().split(" ")[1] + " " + newDate.getDate();
      }
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
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={this.state.newcomment}
                  id="commentfield"
                  className={"Editor " + (this.state.newcomment ? "" : "empty")}
                  onChange={this.handleChange}
                />
                <div className="addComment">
                  <a
                    id="adCommentBtn"
                    style={{ display: "none" }}
                    onClick={this.comment}
                  >
                    Add Comment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.comment && (
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
                        {this.state.comment.userID !== 0 && (
                          <a href="/" className="name">
                            {this.state.comment.user}
                          </a>
                        )}
                        {this.state.comment.userID === 0 && (
                          <span className="name">
                            {this.state.comment.user}
                          </span>
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
                              this.state.comment._id
                            }
                          >
                            Commented {date}
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="commentBody">{this.state.comment.comment}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

class QuestionTile extends Component {
  constructor(props) {
    super(props);
    this.toggleFollow = this.toggleFollow.bind(this);
  }

  toggleFollow = () => {
    console.log("Toggle");
    QuestionService.Follow(this.props.question._id, resp => {
      if (resp !== false) {
        console.log(resp);
        this.props.question.followed =
          this.props.question.followed === undefined
            ? true
            : !this.props.question.followed;
        this.props.question.follows = resp;
        this.forceUpdate();
      }
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className="tile">
        <div className="tileHeader">Question added · {this.props.topic}</div>
        <span>
          <a href={"/question/SingleQuestion/" + this.props.question._id} className="questionHeader">
            {this.props.question.question}
          </a>
        </span>
        <div className="action-bar">
          <div className="action-bar-inner u-flex">
            <div className="action-button">
              <a href="/">
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
                <div className="action-button-text">Answer</div>
              </a>
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
                          this.props.question.followed ? "#329bff" : "#666"
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
                <div
                  className="action-button-text"
                  style={{
                    color: this.props.question.followed ? "#329bff" : "#666"
                  }}
                >
                  Follow
                  {this.props.question.follows ||
                  this.props.question.follows > 0
                    ? " · " + this.props.question.follows
                    : ""}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
