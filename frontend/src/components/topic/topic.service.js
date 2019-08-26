import axios from 'axios';
import Constants from '../../utils/constants';

const TopicService = () => {}

TopicService.getTopics = (callback) => {
    axios.get(Constants.apiUrl + 'topic?token='+localStorage.getItem(Constants.tokenName)).then(response => {
        callback(response.data);
    })
}

TopicService.followTopics = (ids, callback) => {
    axios.post(Constants.apiUrl + 'topic/follow', {topicid: ids, token: localStorage.getItem(Constants.tokenName)}).then(response => {
        callback(response.data);
    })
}

export default TopicService;