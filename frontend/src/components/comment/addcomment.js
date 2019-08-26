import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../utils/constants';
import CommentService from './comment.service';

class AddComment extends Component {

    constructor() {
        super();
        this.state = {
            comments: [
                {
                    _id: "1",
                    commentText: "Sample Comment 1",
                },
                {
                    _id: "2",
                    commentText: "Sample Comment 2",
                }
            ]
        }

        this.href = React.createRef();
    }

    componentDidMount() {
        // CommentService.getComments("123", data => {
        //     let comments = data.map(v => {
        //         return {
        //             _id: v._id,
        //             commentText: v.commentText,
        //         }
        //     });
        //     this.setState({comments: comments});
        // })
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    render() {
        return(
            <div>
                {this.state.comments.map((c) => (
                    <React.Fragment key={c._id}>
                        <button onclick={(e) => this.commentVote(e,c._id,'upvote')}>
                            +
                        </button>
                        <button onclick={(e) => this.commentVote(e,c._id,'downvote')}>
                            -
                        </button>
                        <p>{c.commentText}</p>
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

export default AddComment;