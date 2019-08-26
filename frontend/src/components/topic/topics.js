import React, { Component } from 'react';
import TopicService from './topic.service';
import { Redirect } from 'react-router-dom';

class TopicList extends Component {
    constructor(){
        super();
        this.state = {
            topics: [],
            redirect: false,
            error: false
        }

        this.href = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.getComponents();
    }

    getComponents = () => {
        TopicService.getTopics(data => {
            let topics = data.topics.map(v => {
                return {
                    _id: v._id,
                    topicName: v.topicName,
                    checked: v.followed
                }
            });
            this.setState({topics: topics});
        })
    }

    updateList = (id) => {
        let state = this.state;
        let index = state.topics.indexOf(state.topics.filter(v => {
            return v._id === id;
        })[0]);
        state.topics[index].checked = !state.topics[index].checked;
        this.setState(state);
    }

    handleSubmit = () => {
        let selected = this.state.topics.filter(v => {
            return v.checked;
        });
        if(selected.length === 0){
            this.setState({error: true})
            this.href.current.scrollTo(0,0);
        }else{
            let selectedIDs = selected.map(v => {
                return v._id;
            });
            TopicService.followTopics(selectedIDs, resp => {
                if(resp.success){
                    this.setState({error: false,redirect: true});
                }
            })
        }
    }

    render(){
        let topics = [];
        this.state.topics.forEach(topic => {
            topics.push(<Topic key={topic._id} checked={() => this.updateList(topic._id)} topic={topic} />);
        })
        return(
            <div className='body' ref={this.href}>
                <div className='sidebar'></div>
                <div className='main-body'>
                    {this.state.redirect && <Redirect to='/' />}
                    {this.state.error && <div className='tile checkbox error'>
                        Select at least one topic before proceding
                    </div>}
                    {topics}
                    <button className='Button' onClick={this.handleSubmit}>Follow</button>
                </div>
            </div>
        )
    }
}

class Topic extends Component {
    constructor(props) {
        super(props);
        this.toggleCheck = this.toggleCheck.bind(this);
    }

    toggleCheck = () => {
        this.props.checked();
    }

    render(){
        return(
            <div className={'tile checkbox ' + (this.props.topic.checked ? 'selected' : '')} onClick={this.toggleCheck}>
                {this.props.topic.topicName}
            </div>
        )
    }
}

export default TopicList;