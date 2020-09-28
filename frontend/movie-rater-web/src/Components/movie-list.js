import React from 'react';
import axios_conf from '../axios-config';
import './movie-list.css';
let FontAwesome = require('react-fontawesome');

const MovieList = (props) => {
	const { movies } = props;

	const onMovieClicked = (movie) => {
		props.movieClicked(movie);
	};

	const deleteMovie = (movie) => {
		axios_conf
			.delete(`movies/${movie.id}/`)
			.then((resp) => {
				console.log(resp);
				props.movieDeleted(movie);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			{movies.map((movie) => {
				return (
					<div key={movie.id} className="movie-list-item">
						<h3 onClick={(evt) => onMovieClicked(movie)}>{movie.title}</h3>
						<FontAwesome name="edit" className="movie-list-item__icon-edit" />
						<FontAwesome
							name="trash"
							className="movie-list-item__icon-trash"
							onClick={(evt) => deleteMovie(movie)}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default MovieList;
