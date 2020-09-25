import React, { Component } from 'react';
import './App.css';
import MovieList from './Components/movie-list';

import axios_conf from './axios-config';

export default class App extends Component {
	state = {
		movies: [],
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

	render() {
		return (
			<div className="App">
				<h1>Movie Rater</h1>
				<MovieList movies={this.state.movies} />
			</div>
		);
	}
}
