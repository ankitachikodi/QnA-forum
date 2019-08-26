var rpc = new (require("./kafkarpc"))();

//make request to kafka
function make_request(queue_name, msg_payload, callback) {
  console.log(`from index.js a message is posted to kafka topic ${queue_name}`);
  console.log(msg_payload);
  rpc.makeRequest(queue_name, msg_payload, function(err, response) {
    console.log("inside callback function for client.js make_request");
    if (err) {
      console.error(err);
    } else {
      console.log("response", response);
      callback(null, response);
    }
  });
}

exports.make_request = make_request;
