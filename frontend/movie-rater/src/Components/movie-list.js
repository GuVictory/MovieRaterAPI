import React from 'react';

const MovieList = (props) => {
	console.log(props);

	const { movies } = props;
	return (
		<React.Fragment>
			{movies.map((movie) => {
				return <h3>{movie}</h3>;
			})}
		</React.Fragment>
	);
};

export default MovieList;
