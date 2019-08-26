import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from "react-router-dom";
import AuthService from "./utils/auth-service";
import Login from "./components/account/login";
import SignUp from "./components/account/signup";
import Home from "./components/home/home";
import Header from "./components/header/header";
import Answer from "./components/answer/Answer";
import AddQuestion from "./components/question/AskQuestion";
import IndividualQuestion from "./components/question/IndividualQuestion";
import TopicList from "./components/topic/topics";
import Editprofile from "./components/profile/profile";
import DisplayProfile from "./components/profile/DisplayProfile";
import feedbar from "./components/feedBar/feedBar";
import ProfileOther from "./components/profile/ProfileOther";
import Question from "./components/question/questionList";
import Content from "./components/user/content";
import Search from "./components/search/search";
import CommentList from "./components/comment/commentList";
import QuestionAnswerView from "./components/question/QuestionAnswerView";
import Analytics from "./components/user/analytics";
import Notifications from "./components/account/notification";
import Chat from "./components/chat/chat";


class Routes extends Component {
  NotAPath = () => {
    return (
      <div>
        Hey, You seem to be lost. You may want to go <Link to="/">Here</Link>
      </div>
    );
  };

  NoMatch = () => {
    return <Redirect to="/404" />;
  };

  AccessDenied = () => {
    return (
      <div>
        You don't seem to have acces to that! You may want to go
        <Link to="/">Here</Link>
      </div>
    );
  };

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/answer" component={Answer} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <AuthenticatedRoute exact path="/" component={Home} />
            <AuthenticatedRoute exact path="/topic/:id" component={Home} />
            <AuthenticatedRoute exact path="/topics" component={TopicList} />
            <AuthenticatedRoute
              exact
              path="/notifications"
              component={Notifications}
            />
            <AuthenticatedRoute
              exact
              path="/question"
              component={AddQuestion}
            />
            <AuthenticatedRoute
              exact
              path="/questionanswersview"
              component={QuestionAnswerView}
            />

            {/* <AuthenticatedRoute exact path="/answer" component={TextEditor} /> */}
            <AuthenticatedRoute
              exact
              path="/questionforyou"
              component={IndividualQuestion}
            />
            <AuthenticatedRoute
              exact
              path="/question/singleQuestion/:id"
              component={QuestionAnswerView}
            />
            <AuthenticatedRoute
              exact
              path="/displayProfile"
              component={DisplayProfile}
            />
            <AuthenticatedRoute exact path="/feedbar" component={feedbar} />
            <AuthenticatedRoute
              exact
              path="/feedbar/questions"
              component={Question}
            />
            <AuthenticatedRoute
              exact
              path="/updateprofile"
              component={Editprofile}
            />
            <AuthenticatedRoute
              exact
              path="/profileother/:userid"
              component={ProfileOther}
            />
            <AuthenticatedRoute
              exact
              path="/analytics/"
              component={Analytics}
            />
            <AuthenticatedRoute exact path="/content" component={Content} />
            <AuthenticatedRoute
              exact
              path="/search/:search"
              component={Search}
            />
            <AuthenticatedRoute exact path="/chat" component={Chat} />
            <AuthenticatedRoute
              exact
              path="/commentList"
              component={CommentList}
            />
            <Route path="/404" component={this.NotAPath} />
            <Route path="/AccessDenied" component={this.AccessDenied} />
            <Route component={this.NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  let auth = false;
  AuthService.checkLogin(resp => {
    auth = resp;
  });
  return (
    <Route
      {...rest}
      exact
      render={props =>
        auth ? (
          <div className="main-div">
            <Header {...props} />
            <Component {...props} />
          </div>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default Routes;
