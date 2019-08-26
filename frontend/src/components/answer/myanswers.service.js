import axios from 'axios';
import Constants from '../../utils/constants';

const QuestionService = () => { }

QuestionService.getAnswers = (callback) => {
    axios.get(Constants.apiUrl + 'answer/getanswers?token=' + localStorage.getItem(Constants.tokenName)).then(response => {
        callback(response.data);
    })
}

QuestionService.getQuestionAnswers = (questionid, callback) => {
    axios.get(Constants.apiUrl + 'answer/getanswers?questionID=' + questionid).then(response => {
        callback(response.data);
    })
}

export default QuestionService;