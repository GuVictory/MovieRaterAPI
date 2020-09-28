import React from 'react';
import './stars.css';
let FontAwesome = require('react-fontawesome');

const Stars = (props) => {
	const { stars } = props;

	return (
		<React.Fragment>
			{[...Array(5)].map((e, i) => {
				return <FontAwesome name="star" className={stars > i ? 'orange-star' : ''} key={i} />;
			})}
		</React.Fragment>
	);
};

export default Stars;
