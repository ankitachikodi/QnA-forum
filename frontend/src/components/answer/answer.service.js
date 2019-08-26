import axios from "axios";
import Constants from "../../utils/constants";
import { log } from "util";

const AnswerService = () => {};

AnswerService.addComment = (answerid, comment, callback) => {
  console.log("from answer service", answerid, comment);

  axios
    .post(Constants.apiUrl + "comment/addcomment", {
      authToken: localStorage.getItem(Constants.tokenName),
      commentText: comment,
      answerid: answerid
    })
    .then(resp => {
      callback(resp.data);
    });
};

AnswerService.getComments = (answerid, callback) => {
  axios
    .get(
      Constants.apiUrl +
        "comment/getcomments?answerid=" +
        answerid +
        "&token=" +
        localStorage.getItem(Constants.tokenName)
    )
    .then(resp => {
      callback(resp.data);
    });
};

AnswerService.Vote = (answerid, voteType, callback) => {
  axios
    .post(Constants.apiUrl + "vote/answervote", {
      answerid: answerid,
      voteType: voteType,
      token: localStorage.getItem(Constants.tokenName)
    })
    .then(resp => {
      if (resp.status === 200) {
        callback(resp.data);
      } else {
        callback(false);
      }
    });
};

export default AnswerService;
