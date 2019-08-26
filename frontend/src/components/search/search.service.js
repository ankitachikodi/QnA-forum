import axios from 'axios';
import Constants from '../../utils/constants';

const SearchService = () => {}

SearchService.getContents = (search, callback) => {
    axios.get(Constants.apiUrl + 'users/search?search='+search+'&authToken='+localStorage.getItem(Constants.tokenName)).then(response => {
        callback(response.data);
    })
}

export default SearchService;