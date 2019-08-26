import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class FeedBar extends Component {
    render() {
        return (
          <div>
            <br />
            <br />
            <br /> <br />
            <br /> <br />
            <div
              className="NavList EditableList ProfileNavList"
              id="__w2_w4uKj8Vi32_wrapper"
            >
              <h3 className="title">
                <div>Feeds</div>
              </h3>

              <div>
                <div id="w4uKj8Vi60">
                  <li className="NavItem NavListItem AnswersNavItem EditableListItem not_removable">
                                <Link to={`question/getquestions`}>Answers</Link>
                  </li>
                </div>
              </div>
              <div>
                <div id="w4uKj8Vi62">
                  <li className="QuestionsNavItem NavListItem EditableListItem NavItem not_removable">
                    <Link to={`question/getquestion`}>Questions</Link>
                  </li>
                </div>
              </div>
              <div id="w4uKj8Vi72">
                <li className="NavItem NavListItem FollowersNavItem EditableListItem not_removable">
                            <Link to={`question/getquestion`}>Folowers</Link>
                </li>
              </div>

              <div>
                <div id="w4uKj8Vi74">
                  <li className="NavItem NavListItem EditableListItem FollowingNavItem not_removable">
                                <Link to={`question/getquestion`}>Following</Link>
                  </li>
                </div>
              </div>
            </div>
          </div>
        );
    }
}