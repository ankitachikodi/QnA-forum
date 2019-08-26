import React, { Component } from "react";
import constants from "../../utils/constants";
import axios from "axios";
export default class AskQuestion extends Component {
  constructor() {
    super();
    this.state = {
      topicID: "",
      question: "",
      allTopics: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.gettopics();
  }
  gettopics() {
    axios
      .get("/topic/getalltopics", {
        params: {
          token: localStorage.getItem(constants.tokenName)
        }
      })
      .then(data => {
        console.log("data", data);

        this.setState({
          allTopics: data.data.topics
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleOnSelect(e) {
    this.setState({
      topicID: e.target.name
    });
    console.log("on topic select", e.target.val);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const question = {
      topicID: this.state.topicID,
      token: localStorage.getItem(constants.tokenName),
      question: this.state.question
    };
    console.log(question);
    axios
      .post(constants.apiUrl + "question/addquestion", question)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  render() {
    let topics;
    topics = this.state.allTopics.map(data => {
      return (
        <option key={data._id} value={data._id}>
          {data.topicName}
        </option>
      );
    });
    console.log(this.state);

    return (
      <div className="body">
        <div className="sidebar" />
        <div className="main-body">
          <div style={boderBox}>
            <div>
              <h5>Ask Question</h5>
              <hr />
            </div>
            <div>
              <div>
                <h5>Tips on getting good answers quickly</h5>
                <ul style={ulStyle}>
                  <li>Make sure your question hasn't been asked already</li>
                  <li>Keep your question short and to the point</li>
                  <li>Double-check grammar and spelling</li>
                </ul>
                <hr />
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <small>Ezana Tesfaye(Name of User)</small>
                  <label htmlFor="question" />
                  <textarea
                    style={textarea}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder='Start Your Question with "What","How","why"'
                    id="question"
                    name="question"
                    rows={3}
                  />
                </div>
                <hr />
                <div className="form-group row">
                  <div style={{ paddingLeft: "15px" }}>
                    Select Topic:&nbsp;&nbsp;
                    <select
                      style={{ background: "#b92b27" }}
                      name="topicID"
                      className="btn btn-secondary dropdown-toggle"
                      onChange={this.handleChange}
                    >
                      {topics}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-10">
                    <button
                      type="submit"
                      style={{ background: "#b92b27" }}
                      className="btn btn-primary"
                    >
                      Add Question
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const textarea = {
  height: "100px"
};
const answerStyle = {
  width: "100%"
};
const innneStyle = {
  width: "500px",
  margin: "100px auto 0"
};
const boderBox = {
  border: "1px solid #aaa",
  padding: "10px"
};
const ulStyle = {
  listStyleType: "circle",
  paddingLeft: "10px"
};

const dropDown = {
  position: "relative",
  display: "inline-block"
};
const dropDownContent = {
  display: "none",
  position: "absolute",
  backgroundColor: "f9f9f9",
  minWidth: "160px",
  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  padding: "12px 16px",
  zIndex: "1"
};
