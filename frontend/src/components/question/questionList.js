import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../utils/constants';
import QuestionService from './questionList.service';
// import Comment from '../comment/commentList';

class QuestionList extends Component {

    constructor() {
        super();
        this.state = {
            questionList: [
                
            ],
        }

        this.href = React.createRef();
        //this.listAnswers = this.listAnswers.bind(this);
    }

    componentDidMount() {
        QuestionService.getQuestionList((data) => {
            console.log('data: ',data);
            this.setState({ questionList: data.result });
        })
    }

    render() {
        return(
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
                
            </div>
            </div>
        )
    }
}

export default QuestionList;