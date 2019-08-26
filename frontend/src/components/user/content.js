import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../utils/constants';
import ContentService from './content.service';
import Comment from '../comment/commentList';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

import './content.css';

class Content extends Component {

    constructor() {
        super();
        this.state = {
            content: [],
            sort: 'newest',
            filter: 'all',
        }

        this.href = React.createRef();
        //this.createItem = this.createItem.bind(this);
        //this.filterList = this.filterList.bind(this);
    }

    componentDidMount() {
        ContentService.getContents(this.state.filter, this.state.sort, (data) => {
            this.setState({ content: data });
        })
    }

    createItem = (item) => {
        if (typeof item.answer !== "undefined") { //this is an answer
            console.log("Answer Item");
            let question = '';
            if (item.questionID != null) {
                question = item.questionID.question;
            }
            return (
                <li>
                    <p>Made an answer: {item.answer} , For question: </p> <Link to={`/question/${item.questionID}`}>{question}</Link>
                    <p>{item.date}</p>
                    <hr />
                </li>
            )
        } else { //this is a question
            console.log("Question Item");
            return (
                <li>
                    <p>Asked a new question:</p> <Link to={`/question/${item.questionID}`}>{item.question}</Link>
                    <p>{item.date}</p>
                    <hr />
                </li>
            )
        }
    }

    filterList(filter) {
        this.setState({ filter: filter });
        ContentService.getContents(this.state.filter, this.state.sort, (data) => {
            this.setState({ content: data });
        })
    }
    orderList(sort) {
        this.setState({ sort: sort });
        ContentService.getContents(this.state.filter, this.state.sort, (data) => {
            this.setState({ content: data });
        })
    }

    render() {
        return(
            <div>
            <div className="row top-padding">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h3>Your Contents</h3>
                </div>
                <div className="col-md-3"></div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <h3>Filter</h3>
                    <li onClick={() => { this.filterList("all") }}>Show All</li>
                    <li onClick={() => { this.filterList("question") }}>Questions</li>
                    <li onClick={() => { this.filterList("answer") }}>Answers</li>
                    <h3>Sort</h3>
                    <li onClick={() => { this.orderList("newest") }}>Newest</li>
                    <li onClick={() => { this.orderList("oldest") }}>Oldest</li>
                </div>
                <div className="col-md-6">
                    {this.state.content.map((i) => (
                        <React.Fragment key={i._id}>
                            {this.createItem(i)}
                        </React.Fragment>
                    ))}
                </div>
                <div className="col-md-3"></div>
                {/* <h3>Your Content</h3>
                <h3>Questions</h3>
                {this.state.questions.map((q) => (
                    <React.Fragment key={q._id}>
                        <p>{q.question}</p>
                    </React.Fragment>
                ))}
                <h3>Answers</h3>
                {this.state.answers.map((a) => (
                    <React.Fragment key={a._id}>
                        <p>{a.answer}</p>
                    </React.Fragment>
                ))}
                <h3>Comment</h3>
                <Comment /> */}
            </div>
            </div>
        )
    }
}

export default Content;