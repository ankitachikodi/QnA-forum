import axios from "axios";
import Constants from "../../utils/constants";

const CommentService = () => {};

CommentService.getComments = (answerid, callback) => {
  axios
    .get(Constants.apiUrl + "comment/getcomments?answerid=" + answerid)
    .then(response => {
      callback(response.data);
    });
};

CommentService.commentVote = (commentid, voteType, callback) => {
  axios
    .post(Constants.apiUrl + "vote/commentvote", {
      commentid: commentid,
      voteType: voteType,
      authToken: localStorage.getItem(Constants.tokenName)
    })
    .then(response => {
      callback(response.data);
    });
};

CommentService.commentVoteUser = (commentid, callback) => {
  axios
    .get(
      Constants.apiUrl +
        "vote/commentvoteuser?commmentid=" +
        commentid +
        "&authToken=" +
        localStorage.getItem(Constants.tokenName)
    )
    .then(response => {
      callback(response.data);
    });
};

CommentService.commentVoteTotal = (commentid, callback) => {
  axios
    .get(Constants.apiUrl + "vote/commentvotetotal?commmentid=" + commentid)
    .then(response => {
      callback(response.data);
    });
};

CommentService.addComment = (commentText, answerid, callback) => {
  axios
    .post(Constants.apiUrl + "comment/addcomment", {
      answerid: answerid,
      commentText: commentText,
      authToken: localStorage.getItem(Constants.tokenName)
    })
    .then(response => {
      callback(response.data);
    });
};

export default CommentService;
