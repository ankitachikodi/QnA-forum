import React, { Component } from 'react';
import FeedService from '../home/feed.service';

class Notifications extends Component {
    constructor(){
        super();
        this.state = {
            notifications: []
        };
        this.getNotifications();
    }

    getNotifications = () => {
        FeedService.getNotifications(resp => {
            this.setState({notifications: resp.answers});
        })
    }
    render() {
        let notifications = [];
        this.state.notifications.forEach(notification => {
            let date = '';
            let newDate =  new Date(notification.date);
            let timeDiff = Date.now()/1000 - newDate.getTime()/1000;
            if(timeDiff < 86400){
                if(timeDiff < 3600){
                    if(timeDiff < 60){
                        date = Math.ceil(timeDiff) + 's ago';
                    }else{
                        date = Math.ceil(timeDiff/60) + 'min ago';
                    }
                }else{
                    date = Math.ceil(timeDiff/3600) + 'h ago';
                }
            }else if(timeDiff < 604800){
                date = Math.ceil(timeDiff/86400) + ' days ago'
            }else{
                date = newDate.toString().split(' ')[1] + ' ' + newDate.getDate();
            }
            notifications.push(
                <li key={notification.answerID} className='notification-panel'>
                    <a className='u-absolute u-width--100 u-height--100' target='_blank' href='/'></a>
                    <div className='u-pointer-events--none'>
                        <div className='notif-item u-width--100'>
                            <span className='user'>{notification.owner ? notification.owner : 'Someone'}</span>
                            <span> {notification.followedquestion ? 'answered a question you follow' : 'answered your question'}: </span>
                            <span>{notification.question}&nbsp;</span>
                            <span className='timestamp'>{date}</span>
                        </div>
                    </div>
                </li>
            );
        });
        return(
            <div className='body'>
                <div className='sidebar'>
                    <ul>
                        <li className='sidebar-item active'>Notifications</li>
                    </ul>
                </div>
                <div className='main-body'>
                    <ul>
                        {notifications}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Notifications;