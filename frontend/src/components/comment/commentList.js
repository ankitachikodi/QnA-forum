import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../utils/constants';
import CommentService from './comment.service';
import CommentItem from './commentItem';

class CommentList extends Component {

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
        // CommentService.getComments(this.props.answerid, data => {
        //     let comments = data.map(v => {
        //         return {
        //             _id: v._id,
        //             commentText: v.commentText,
        //         }
        //     });
        //     this.setState({comments: comments});
        // })
    }

    render() {
        return(
            <div>
                {this.state.comments.map((c) => (
                    <React.Fragment key={c._id}>
                        <CommentItem commentid={c._id} />
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

export default CommentList;