import React, {Component} from 'react';
import {connect} from "react-redux";

import moment from 'moment';
import timezone from 'moment-timezone'
import 'moment/locale/zh-hk'  // without this line it didn't work

import './App.css';

import InfoCard from './components/InfoCard/InfoCard';

import {getData, getRedditData} from "./actions/getData";

class App extends Component {
	dummyData = [
		{
			"location": "GreenTaxiStand",
			"count": 1,
			"modifiedAt": "2019-05-02T17:45:57.5422127+08:00"
		},
		{
			"location": "MiniBusStop",
			"count": 1,
			"modifiedAt": "2019-05-02T17:46:48.4349612+08:00"
		},
		{
			"location": "RedTaxiStand",
			"count": 4,
			"modifiedAt": "2019-05-02T17:47:06.1495841+08:00"
		}
	];


	componentDidMount() {
		moment.locale('zh-hk');
		this.props.getData();
		this.props.getRedditData();
		setInterval(() => {
			console.log(moment().format('LLLL:ss'));
			this.refresh();
		}, 60000)
	}

	componentDidUpdate(prevProps) {
		// console.log('componentDidUpdate:')
		// console.log(prevProps)
		// console.log(this.props)
	}

	refresh = () => {
		this.props.getData();
		this.props.getRedditData();
	}

	render() {
		return (
			<div className="App">
				<div className='refreshContainer'>
					{
						// !this.props.data.isFetching &&
						<button onClick={this.refresh}>
							Refresh
						</button>
					}
				</div>


				<header className="App-header">
					香港科學園的士和小巴的實時資訊
				</header>
				<div className='App-content'>
					<p>{this.props.data.lastRefrech ? moment(this.props.data.lastRefrech).format('LLLL:ss') : ''}</p>

					{
						!this.props.data
							? <p>No data</p>
							:
							this.props.data.isFetching
								? <p>Fetching...</p>
								: this.props.data.data.map((item, key) => {
									return <InfoCard key={item.location} title={item.location} queueNum={item.count}
													 modifiedAt={item.modifiedAt}/>
								})
					}

					<p>
						Reddit React JS posts
					</p>
					<span>{this.props.redditData.lastRefrech ? moment(this.props.redditData.lastRefrech).format('LLLL:ss') : ''}</span>
					<div>
						<ul>
							{
								!this.props.redditData.data.data
									? <p>No data</p>
									:
									this.props.redditData.isFetching
										? <p>Fetching...</p>
										: this.props.redditData.data.data.children.map((item, key) => {
											return <li key={item.data.id}>
												<a href={item.data.url} target="_blank">{item.data.title}</a>
											</li>
										})
							}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	data: state.getData,
	redditData: state.getRedditData
});
const mapDispatchToProps = dispatch => ({
	getData: () => dispatch(getData()),
	getRedditData: () => dispatch(getRedditData()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
