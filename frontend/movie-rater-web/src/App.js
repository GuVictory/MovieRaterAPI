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

	loadMovie = (movie) => {
		this.setState({ selectedMovie: movie });
	};

	movieDeleted = (movie) => {
		const newMovies = this.state.movies.filter((el) => {
			return el.id !== movie.id;
		});
		const newSelectedMovie =
			this.state.selectedMovie.id === movie.id ? null : this.state.selectedMovie;
		this.setState({
			movies: newMovies,
			selectedMovie: newSelectedMovie,
		});
	};

	render() {
		return (
			<div className="App">
				<h1>Movie Rater</h1>
				<div className="layout">
					<MovieList
						movies={this.state.movies}
						movieClicked={this.loadMovie}
						movieDeleted={this.movieDeleted}
					/>
					<MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie} />
				</div>
			</div>
		);
	}
}
