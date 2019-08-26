import axios from 'axios';
import Constants from '../../utils/constants';
import { decode } from "jsonwebtoken";

const ChatService = () => {}

ChatService.get = (receiver, callback) => {
    axios
      .post(Constants.apiUrl + "chat/get", {
        token: localStorage.getItem(Constants.tokenName),
        sender: decode(localStorage.getItem(Constants.tokenName)).user.toString(),
        receiver: receiver
      })
      .then(resp => {
        callback(resp.data);
      });
};

ChatService.getAll = (callback) => {
    axios
        .post(Constants.apiUrl + "chat/getAll", {
            token: localStorage.getItem(Constants.tokenName),
          userId: decode(localStorage.getItem(Constants.tokenName)).user.toString()
        })
        .then(resp => {
            callback(resp.data);
        });
};

ChatService.put = (receiver, text, callback) => {
    axios
      .post(Constants.apiUrl + "chat/put", {
        token: localStorage.getItem(Constants.tokenName),
        sender: decode(
          localStorage.getItem(Constants.tokenName)
        ).user.toString(),
        receiver: receiver,
        text: text
      })
      .then(resp => {
        callback(resp.data);
      });
};



export default ChatService;