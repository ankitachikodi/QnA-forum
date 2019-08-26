import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../utils/constants';
import CommentService from './comment.service';

class CommentItem extends Component {

    constructor() {
        super();
        this.state = {
            commentid: '',
            commentText: '',
            user: '',
            voteTotal: '',
            voteUser: '',
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
        let voteTotal = this.getVoteTotal(this.props.commentid);
        let voteUser = this.getVoteUser(this.props.commentid);
        console.log("Votetotal: ",voteTotal, " Voteuser: ", voteUser);
        this.setState({ voteTotal: voteTotal });
        this.setState({ voteUser: voteUser });
    }

    commentVote = (e, voteType) => {
        e.preventDefault();
        CommentService.commentVote(this.state.commentid, voteType, data => {
            if (voteType === 'upvote') {
                if (this.state.voteUser === 1) {
                    this.setState({ voteTotal: this.state.voteTotal-1 });
                    this.setState({ voteUser: 0 });
                } else if (this.state.voteUser === -1) {
                    this.setState({ voteTotal: this.state.voteTotal+1 });
                    this.setState({ voteUser: 1 });
                } else if (this.state.voteUser === 0) {
                    this.setState({ voteTotal: this.state.voteTotal+1 });
                    this.setState({ voteUser: 1});
                }
            } else if (voteType === 'downvote') {
                if (this.state.voteUser === -1) {
                    this.setState({ voteUser: 0 });
                } else if (this.state.voteUser === 1) {
                    this.setState({ voteTotal: this.state.voteTotal-1 });
                    this.setState({ voteUser: -1 });
                } else if (this.state.voteUser === 0) {
                    this.setState({ voteUser: -1 });
                }
            }
        })
    }

    getVoteUser = (commentid) => {
        CommentService.commentVoteUser(commentid, data => {
            return data.voteType;
        })
    }

    getVoteTotal = (commentid) => {
        CommentService.commentVoteTotal(commentid, data => {
            return data.total;
        })
    }

    render() {
        return(
            <div>
                <button onclick={(e) => this.commentVote(e,'upvote')}>
                    +
                </button>
                <button onclick={(e) => this.commentVote(e,'downvote')}>
                    -
                </button>
                <p>Total Upvotes: {this.state.voteTotal}</p>
                <p>Text: {this.state.commentText}</p>
            </div>
        )
    }
}

export default CommentItem;