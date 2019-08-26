import axios from 'axios';

import Constants from '../../utils/constants';



let ProfileService = () => { }



ProfileService.updateProfile = (profile, callback) => {

    let payload = {
      token: localStorage.getItem(Constants.tokenName),

      firstName: profile.firstName,
      middleName: profile.middleName,
      familyName: profile.familyName,
      city: profile.city,
      state: profile.state,
      zip: profile.zip,
      career: profile.career,
      bio: profile.bio,
      credentials: profile.credentials,
      education: profile.education
    };

    axios.post(Constants.apiUrl + 'users/profile', payload).then(resp => {

        callback(resp);

    })

}



export default ProfileService;