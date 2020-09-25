import React, { Component } from 'react';
import './App.css';
import MovieList from './Components/movie-list';

export default class App extends Component {
	movies = ['titanic', 'avatar'];

	componentDidMount() {
		// going to fetch data from server
	}

	render() {
		return (
			<div className="App">
				<h1>Movie Rater</h1>
				<MovieList movies={this.movies} />
			</div>
		);
	}
}
