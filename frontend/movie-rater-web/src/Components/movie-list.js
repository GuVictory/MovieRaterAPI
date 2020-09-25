import React from 'react';

const MovieList = (props) => {
	const { movies } = props;
	return (
		<React.Fragment>
			{movies.map((movie) => {
				return <h3 key={movie.id}>{movie.title}</h3>;
			})}
		</React.Fragment>
	);
};

export default MovieList;
