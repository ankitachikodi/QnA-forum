// import React, { Component } from "react";
// import constants from "../../utils/constants";
// import axios from "axios";
// export default class AddAnswer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       questionID: "",
//       answer: ""
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }
//   componentDidMount() {
//     axios.get("/user/profile");
//   }
//   handleChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }
//   handleSubmit(e) {
//     e.preventDefault();
//     const answer = {
//       token: localStorage.getItem(constants.tokenName),
//       questionID: "5ccb7b3b62604c729f9ed6c5",
//       answer: this.state.answer
//     };
//     axios
//       .post("/answer/answerquestion", answer)
//       .then(res => console.log(res))
//       .catch(err => console.log(err));
//   }
//   render() {
//     return (
//       <div className="container">
//         <div className="card w-50">
//           <div className="card-body">
//             <small className="text-muted" />
//             <hr />
//             <form onSubmit={this.handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="answer" />
//                 <textarea
//                   style={textarea}
//                   onChange={this.handleChange}
//                   className="form-control"
//                   placeholder="Write your answer"
//                   id="answer"
//                   name="answer"
//                 />
//               </div>
//               <hr />
//               <div className="form-group row">
//                 <div className="col-sm-10">
//                   <button type="submit" className="btn btn-primary">
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// const textarea = {
//   height: "100px"
// };
// const answerStyle = {
//   width: "100%"
// };
// const innneStyle = {
//   width: "500px",
//   margin: "100px auto 0"
// };
// const boderBox = {
//   border: "1px solid #aaa",
//   padding: "10px"
// };
