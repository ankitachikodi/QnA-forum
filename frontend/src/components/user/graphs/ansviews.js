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
	render() {
		let data = this.props.data;
		let x = 0;
		data = Object.keys(data).map(k => {
			x++;
			return {x: x, y: data[k].count};
		})
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1", // "light2", "dark1", "dark2"
			title:{
				text: "Most Viewed Answers"
			},
			axisY: {
				title: "Views",
				includeZero: true,
				suffix: ""
			},
			axisX: {
				interval: 1
			},
			data: [{
				type: "column",
				toolTipContent: "Answer #{x}: {y} Views",
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