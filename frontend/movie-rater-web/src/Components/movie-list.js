import React from 'react';

const MovieList = (props) => {
	const { movies } = props;

	const onMovieClicked = (movie) => (evt) => {
		props.movieClicked(movie);
	};
	return (
		<div>
			{movies.map((movie) => {
				return (
					<h3 key={movie.id} onClick={onMovieClicked(movie)}>
						{movie.title}
					</h3>
				);
			})}
		</div>
	);
};

export default MovieList;
