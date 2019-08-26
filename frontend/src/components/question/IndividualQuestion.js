import React, { Component } from "react";
import constants from "../../utils/constants";
import { Link, withRouter } from "react-router-dom";
import feedlogo from "../../assets/feed.png";
import axios from "axios";
export default class IndividualQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [],
      isFollowed: ""
    };
    this.handleFollow = this.handleFollow.bind(this);
  }
  componentDidMount() {
    axios
      .get(constants.apiUrl + "question/getquestionstopic", {
        params: {
          token: localStorage.getItem(constants.tokenName)
        }
      })
      .then(data => {
        this.setState({
          question: data.data.result
        });
      })
      .catch(err => console.log(err));
  }
  handleFollow(e, questionID) {
    e.preventDefault();
    console.log("questions id", questionID);
    const follow = {
      questionid: questionID,
      token: localStorage.getItem(constants.tokenName)
    };
    console.log(follow);
    axios
      .post(constants.apiUrl + "question/follow", follow)
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    let questions = null;
    if (this.state.question != null) {
      questions = this.state.question.map(singleQuestion => {
        console.log(singleQuestion);

        return (
          <div className="card w-50">
            <div className="card-body">
              <small className="text-muted">
                Question added -{singleQuestion.topicID.topicName}
              </small>
              <h4 className="card-title">
                <Link
                  to={`/question/singleQuestion/${singleQuestion._id}`}
                  style={{ color: "black" }}
                >
                  {singleQuestion.question}
                </Link>
              </h4>
              <hr />

              <button
                onClick={this.handleEdit}
                value={singleQuestion._id}
                type="button"
                className="btn btn-light"
              >
                <i className="far fa-edit" /> Answer
              </button>
              <button
                onClick={e => this.handleFollow(e, singleQuestion._id)}
                type="submit"
                className="btn btn-light"
              >
                <i className="fas fa-wifi" /> Follow
              </button>
            </div>
          </div>
        );
      });
    }
    return (
      <div className="container">
        <div> {questions} </div>{" "}
      </div>
    );
  }
}

const answerStyle = {
  width: "100%"
};
const innneStyle = {
  margin: "10px auto 0"
};
const boderBox = {
  border: "1px solid #aaa",
  padding: "10px"
};
const indStyle = {
  padding: "auto"
};
