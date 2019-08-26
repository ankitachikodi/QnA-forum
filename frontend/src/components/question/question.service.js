import Axios from "axios";
import Constants from "../../utils/constants";

let QuestionService = () => {}

QuestionService.Follow = (questionid, callback) => {
    Axios.post(Constants.apiUrl + 'question/follow', {questionid: questionid, token: localStorage.getItem(Constants.tokenName)})
        .then(resp => {
            console.log(resp);
            if(resp.status === 200){
                callback(resp.data);
            }else{
                callback(false);
            }
        })
}

export default QuestionService;