import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../utils/constants';
import ContentService from './content.service';
import Comment from '../comment/commentList';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

import ProfViews from './graphs/profviews';
import Top10 from './graphs/top10';
import Bot5 from './graphs/bot5';
import TopBook from './graphs/topbook';
import AnsViews from './graphs/ansviews';

import './content.css';

class Analytics extends Component {

    constructor() {
        super();
        this.state = {
            toptenanswers: [],
            botfiveanswers: [],
            topbookanswers: [],
            profileviews: [],
            topviewedanswers: [],
        }

        this.href = React.createRef();
        //this.createItem = this.createItem.bind(this);
        //this.filterList = this.filterList.bind(this);
    }

    componentDidMount() {
        axios.get(Constants.apiUrl+'users/toptenanswers?&token=' + localStorage.getItem(Constants.tokenName))
            .then(res => {
                console.log("Top ten: ", res.data);
                this.setState({ toptenanswers: res.data })
            });
        axios.get(Constants.apiUrl+'users/bottomfiveanswers?&token=' + localStorage.getItem(Constants.tokenName))
            .then(res => {
                console.log("Bot five: ", res.data);
                this.setState({ botfiveanswers: res.data })
            });
        axios.get(Constants.apiUrl+'users/topbookmarkedanswers?&token=' + localStorage.getItem(Constants.tokenName))
            .then(res => {
                console.log("Top book: ", res.data);
                this.setState({ topbookanswers: res.data })
            });
        axios.get(Constants.apiUrl+'users/profileviews?&token=' + localStorage.getItem(Constants.tokenName))
            .then(res => {
                console.log("Prof View: ", res.data);
                this.setState({ profileviews: res.data })
            });
        axios.get(Constants.apiUrl+'users/topviewedanswers?&token=' + localStorage.getItem(Constants.tokenName))
            .then(res => {
                console.log("Ans View: ", res.data);
                this.setState({ topviewedanswers: res.data })
            });
    }

    render() {
        return(
            <div>
            <div className="row top-padding">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h3>User Analytics</h3>
                </div>
                <div className="col-md-3"></div>
            </div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="nav-top10-tab" data-toggle="tab" href="#nav-top10" role="tab" aria-controls="nav-top10" aria-selected="true">Most Upvoted Answers</a>
                        <a class="nav-item nav-link" id="nav-bot5-tab" data-toggle="tab" href="#nav-bot5" role="tab" aria-controls="nav-bot5" aria-selected="false">Most Downvotes Answers</a>
                        <a class="nav-item nav-link" id="nav-topbook-tab" data-toggle="tab" href="#nav-topbook" role="tab" aria-controls="nav-topbook" aria-selected="false">Most Bookmarked Answers</a>
                        <a class="nav-item nav-link" id="nav-profview-tab" data-toggle="tab" href="#nav-profview" role="tab" aria-controls="nav-profview" aria-selected="false">Profile Views</a>
                        <a class="nav-item nav-link" id="nav-topview-tab" data-toggle="tab" href="#nav-topview" role="tab" aria-controls="nav-topview" aria-selected="false">Most Viewed Answers</a>
                    </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-top10" role="tabpanel" aria-labelledby="nav-top10-tab">
                            {this.state.toptenanswers.map((i) => (
                            <React.Fragment key={i.answer}>
                                <ul>
                                    <Link to={'/analytics'} onClick={() => window.location.refresh()}>
                                        <p>Score: {i.count}</p>
                                        <p>{i.answer}</p>
                                    </Link>
                                    <hr />
                                </ul>
                            </React.Fragment>
                            ))}
                        <Top10 data={this.state.toptenanswers}/>
                        
                        </div>
                        <div class="tab-pane fade" id="nav-bot5" role="tabpanel" aria-labelledby="nav-bot5-tab">
                            {this.state.botfiveanswers.map((i) => (
                            <React.Fragment key={i.answer}>
                                <ul>
                                    <Link to={'/analytics'} onClick={() => window.location.refresh()}>
                                        <p>Score: {i.count}</p>
                                        <p>{i.answer}</p>
                                    </Link>
                                    <hr />
                                </ul>
                            </React.Fragment>
                            ))}
                            <Bot5 data={this.state.botfiveanswers}/>
                        </div>
                        <div class="tab-pane fade" id="nav-topbook" role="tabpanel" aria-labelledby="nav-topbook-tab">
                            {this.state.topbookanswers.map((i) => (
                            <React.Fragment key={i.answer}>
                                <ul>
                                    <Link to={'/analytics'} onClick={() => window.location.refresh()}>
                                        <p>Score: {i.count}</p>
                                        <p>{i.answer}</p>
                                    </Link>
                                    <hr />
                                </ul>
                            </React.Fragment>
                            ))}
                        <TopBook data={this.state.topbookanswers}/>
                        </div>
                        <div class="tab-pane fade" id="nav-profview" role="tabpanel" aria-labelledby="nav-profview-tab">
                            <ProfViews data={this.state.profileviews}/>
                        </div>
                        <div class="tab-pane fade" id="nav-topview" role="tabpanel" aria-labelledby="nav-topview-tab">
                            {this.state.topviewedanswers.map((i) => (
                            <React.Fragment key={i.answer}>
                                <ul>
                                    <Link to={'/analytics'} onClick={() => window.location.refresh()}>
                                        <p>Score: {i.count}</p>
                                        <p>{i.answer}</p>
                                    </Link>
                                    <hr />
                                </ul>
                            </React.Fragment>
                            ))}
                        <AnsViews data={this.state.topviewedanswers}/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Analytics;