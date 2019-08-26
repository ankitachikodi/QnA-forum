import axios from 'axios';
import Constants from '../../utils/constants';

const FeedService = () => {}

FeedService.getFeed = (topic, callback) => {
    console.log(Constants.apiUrl + 'feed?token=' + localStorage.getItem(Constants.tokenName) + (topic ? '&topic=' + topic : ''));
    axios.get(Constants.apiUrl + 'feed?token=' + localStorage.getItem(Constants.tokenName) + (topic ? '&topic=' + topic : ''))
        .then(resp => {
            callback(resp.data);
        })
}

FeedService.getAnswer = (answerID, callback) => {
    axios.get(Constants.apiUrl + 'feed/answer?token=' + localStorage.getItem(Constants.tokenName) + '&answerID=' + answerID)
        .then(resp => {
            callback(resp.data);
        })
}

FeedService.getNotifications = (callback) => {
    axios.get(Constants.apiUrl + 'feed/notifications?token=' + localStorage.getItem(Constants.tokenName))
        .then(resp => {
            callback(resp.data);
        })
}

export default FeedService;