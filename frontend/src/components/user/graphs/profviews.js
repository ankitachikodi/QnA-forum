import React, { Component } from 'react';
import axios from 'axios';
import Constants from '../../../utils/constants';
import ContentService from '../content.service';
import Comment from '../../comment/commentList';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';

import CanvasJSReact from './canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const CanvasJS = CanvasJSReact.CanvasJS;

class graph extends Component {

	state = {
		data: this.props.data,
	}

	render() {
		// var mydate = new Date('2014-04-03');
		// console.log(mydate.toDateString());
		let data = this.props.data;
		data = Object.keys(data).map(k => {
			return {x: new Date(data[k].date), y: data[k].count};
		})
		var dateOffset = (24*60*60*1000) * 30; //5 days
		var min = new Date();
		var max = new Date();
		min.setTime(min.getTime() - dateOffset);
		console.log("data!",data);
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Profile Views"
			},
			axisX:{
				valueFormatString: "DD MMM",
				minimum: min,
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			axisY: {
				title: "Views",
				includeZero: false,
				suffix: ""
			},
			data: [{
				type: "line",
				xValueFormatString: "DD MMM",
				dataPoints: data
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default graph; 