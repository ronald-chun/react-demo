import React from 'react';
import './InfoCard.css';
import moment from 'moment';
import timezone from 'moment-timezone'
import 'moment/locale/zh-hk'  // without this line it didn't work
moment.locale('zh-hk')

const infoCard = (props) => {
	let title = '';
	switch (props.title) {
		case 'GreenTaxiStand':
			title = '綠的';
			break;
		case 'MiniBusStop':
			title = '小巴';
			break;
		case 'RedTaxiStand':
			title = '紅的';
			break;
		default:
			title = "Error";
	}

	return (
		<div className='infoCard'>
			<h2 className='title'>{title}</h2>
			<p className='queueNum'>排隊人數：{props.queueNum}</p>
			<p className='modifiedAt'>最後更新：{moment(props.modifiedAt).format('LLLL')}</p>
		</div>
	);
};

export default infoCard;
