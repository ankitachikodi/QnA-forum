import React, { Component } from "react";
import axios from "axios";
import Constants from "../../utils/constants";
import SearchService from "./search.service";
import Comment from "../comment/commentList";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";

class Content extends Component {
  constructor() {
    super();
    this.state = {
      content: [],
      users: [],
      questions: [],
      topics: [],
      searchText: ""
    };

    this.href = React.createRef();
    //this.createItem = this.createItem.bind(this);
    //this.filterList = this.filterList.bind(this);
  }

  componentDidMount() {
    SearchService.getContents(this.props.match.params.search, data => {
      console.log(data);
      this.setState({ content: data });
      this.setState({ questions: data[0] });
      this.setState({ users: data[1] });
      this.setState({ topics: data[2] });
    });
  }

  render() {
    return (
      //     <div className="body">
      //     <div className='sidebar'>
      //     <ul>
      //         <li className='sidebar-item '></li>
      //     </ul>
      //     </div>

      //   </div>
      <div>
        <div className="row top-padding">
          <div className="col-md-3" />
          <div className="col-md-6">
            <h3>Your Search Results</h3>
            <br />
          </div>
          <div className="col-md-3" />
        </div>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <h4>Questions</h4>
            {this.state.questions.map(i => (
              <React.Fragment key={i._id}>
                <ul>
                  <Link to={`/question/${i._id}`}>{i.question}</Link>
                  <hr />
                </ul>
              </React.Fragment>
            ))}
          </div>
          <div className="col-md-3" />
        </div>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <h4>Users</h4>
            {this.state.users.map(i => (
              <React.Fragment key={i._id}>
                <ul>
                  <Link to={`/profileother/${i._id}`}>{i.userName}</Link>
                  <hr />
                </ul>
              </React.Fragment>
            ))}
          </div>
          <div className="col-md-3" />
        </div>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <h4>Topics</h4>
            {this.state.topics.map(i => (
              <React.Fragment key={i._id}>
                <ul>
                  {i.topicName}
                  <hr />
                </ul>
              </React.Fragment>
            ))}
          </div>
          <div className="col-md-3" />
        </div>
      </div>
    );
  }
}

export default Content;
