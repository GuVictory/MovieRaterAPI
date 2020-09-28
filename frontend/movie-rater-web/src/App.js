import React, { Component } from 'react';
import './App.css';
import MovieList from './Components/movie-list';
import MovieDetails from './Components/movie-detail';
import axios_conf from './axios-config';

export default class App extends Component {
	state = {
		movies: [],
		selectedMovie: null,
	};

	componentDidMount() {
		// going to fetch data from server
		axios_conf
			.get('movies/')
			.then((resp) => {
				this.setState({ movies: resp.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	onMovieClicked = (movie) => {
		this.setState({ selectedMovie: movie });
	};

	render() {
		return (
			<div className="App">
				<h1>Movie Rater</h1>
				<div className="layout">
					<MovieList movies={this.state.movies} movieClicked={this.onMovieClicked} />
					<MovieDetails movie={this.state.selectedMovie} />
				</div>
			</div>
		);
	}
}
