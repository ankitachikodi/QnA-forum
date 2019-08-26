import axios from 'axios';
import Constants from '../../utils/constants';

const ContentService = () => {}

ContentService.getContents = (filter, sort, callback) => {
    axios.get(Constants.apiUrl + 'users/content?filter='+filter+'&sort='+sort+'&authToken='+localStorage.getItem(Constants.tokenName)).then(response => {
        callback(response.data);
    })
}

export default ContentService;