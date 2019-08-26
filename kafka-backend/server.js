var connection = new require("./kafka/Connection");
//topics files
//var signin = require('./services/signin.js');
var Question = require("./services/question");
var userFollow = require("./services/userFollow");
var AddComment = require("./services/addcomment");
var GetComments = require("./services/getcomments");
var GetBookmarkedAnswer = require("./services/getbookmarkedanswers");
var GetBookmarkAll = require("./services/getbookmarkall");
var GetViewcount = require("./services/getviewcount");
var GetAnswersWithMostUpvotes = require("./services/getanswerswithmostupvotes");
var SignUp = require("./services/signup");
var feed = require("./services/feed");
var answerbookmark = require("./services/answerbookmark");
var AnswerVote = require("./services/answervote");
var questionFollow = require("./services/questionFollow");
var CommentVote = require("./services/commentvote");
var profile = require("./services/getprofile");
var updateprofile = require("./services/updateprofile");
var topicfollow = require("./services/topicfollow");
var gettopics = require("./services/gettopics");
var Content = require("./services/content");
var getQuestionTopic = require("./services/getquestiontopic");
var getAnswerforFeed = require("./services/getanswer");
var deleteProfile = require("./services/deleteprofile");
var getQuestions = require("./services/getquestions");
var Search = require("./services/search");
var getFollowers = require("./services/getFollowers");
var getFollowing = require("./services/getFollowing");
var getChat = require("./services/getChat");
var putChat = require("./services/putChat");
var getAllChat = require("./services/getAllChat");
var getAnswerVote = require("./services/getanswervote");
var getnotifications = require("./services/getnotifications");

const db = require("./config/db");

try {
  db.connect();
  console.log("connected");
} catch (e) {
  console.log(e);
}

// function handleTopicRequest(topic_name,fname){
//     //var topic_name = 'root_topic';
//     var consumer = connection.getConsumer(topic_name);
//     var producer = connection.getProducer();
//     console.log('server is running ');
//     consumer.on('message', function (message) {
//         console.log('message received for ' + topic_name +" ", fname);
//         console.log(JSON.stringify(message.value));
//         var data = JSON.parse(message.value);

//         fname.handle_request(data.data, function(err,res){
//             console.log('after handle'+res);
//             var payloads = [
//                 { topic: data.replyTo,
//                     messages:JSON.stringify({
//                         correlationId:data.correlationId,
//                         data : res
//                     }),
//                     partition : 0
//                 }
//             ];
//             producer.send(payloads, function(err, data){
//                 console.log(data);
//             });
//             return;
//         });

//     });
// }
// // Add your TOPICs here
// //first argument is topic name
// //second argument is a function that will handle this topic request
// handleTopicRequest("question",Question)

var answerQuestion = require("./services/answerquestion");
var editAnswer = require("./services/editanswer");
var getAnswer = require("./services/getanswers");
function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("question", Question);
handleTopicRequest("editanswer", editAnswer);
handleTopicRequest("getanswers", getAnswer);
handleTopicRequest("getanswerswithmostupvotes", GetAnswersWithMostUpvotes);
handleTopicRequest("answerbookmark", answerbookmark);
handleTopicRequest("getbookmarkedanswers", GetBookmarkedAnswer);
handleTopicRequest("getbookmarkall", GetBookmarkAll);
handleTopicRequest("getviewcount", GetViewcount);
handleTopicRequest("answer", answerQuestion);
handleTopicRequest("signup", SignUp);
handleTopicRequest("userFollow", userFollow);
handleTopicRequest("addcomment", AddComment);
handleTopicRequest("getcomments", GetComments);
handleTopicRequest("answervote", AnswerVote);
handleTopicRequest("commentvote", CommentVote);
handleTopicRequest("feed", feed);
handleTopicRequest("content", Content);
handleTopicRequest("questionFollow", questionFollow);
handleTopicRequest("profile", profile);
handleTopicRequest("updateprofile", updateprofile);
handleTopicRequest("topicfollow", topicfollow);
handleTopicRequest("getquestionstopic", getQuestionTopic);
handleTopicRequest("gettopics", gettopics);
handleTopicRequest("getanswerforfeed", getAnswerforFeed);
handleTopicRequest("deleteprofile", deleteProfile);
handleTopicRequest("getQuestions", getQuestions);
handleTopicRequest("search", Search);
handleTopicRequest("getFollowers", getFollowers);
handleTopicRequest("getFollowing", getFollowing);
handleTopicRequest("getChat", getChat);
handleTopicRequest("putChat", putChat);
handleTopicRequest("getAllChat", getAllChat);
handleTopicRequest("getanswervote", getAnswerVote);
handleTopicRequest("getnotifications", getnotifications);
