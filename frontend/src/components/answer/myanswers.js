import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../utils/constants';
import QuestionService from './questionList.service';
// import Comment from '../comment/commentList';

class QuestionList extends Component {

    constructor() {
        super();
        this.state = {
            questionList: [],
        }

        this.href = React.createRef();
        //this.listAnswers = this.listAnswers.bind(this);
    }

    componentDidMount() {
        QuestionService.getQuestionList((data) => {
            this.setState({ questionList: data });
        })
    }

    render() {
        return (
            <div>
                <div className="row top-padding">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h3>Your Questions</h3>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6">
                        {this.state.questionList.map((i) => (
                            <React.Fragment key={i._id}>
                                {i.question}
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

export default QuestionList;