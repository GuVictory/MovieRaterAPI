import React, { Component } from 'react';
import Star from './stars';
import axios_conf from '../axios-config';
let FontAwesome = require('react-fontawesome');

export default class MovieDetail extends Component {
	state = {
		higlited: -1,
	};

	setHiglited = (high) => (evt) => {
		this.setState({ higlited: high });
	};

	rateClicked = (star) => (evt) => {
		axios_conf
			.post(`movies/${this.props.movie.id}/rate_movie/`, {
				stars: star,
			})
			.then(() => {
				this.updateMovie();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	updateMovie = () => {
		axios_conf
			.get(`movies/${this.props.movie.id}/`)
			.then((resp) => {
				this.props.updateMovie(resp.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		const { movie } = this.props;

		const MovieDetail = () => (
			<div>
				<h3>{movie.title}</h3>
				<div>
					<Star stars={movie.avg_rating} />({movie.no_of_ratings})
				</div>
				<p>{movie.description}</p>
			</div>
		);

		const RateTheMovie = () => (
			<div className="rate-the-movie">
				<h3>Give us your vote!</h3>
				{[...Array(5)].map((el, i) => {
					return (
						<FontAwesome
							name="star"
							className={this.state.higlited > i - 1 ? 'orange-star' : ''}
							key={i}
							onMouseEnter={this.setHiglited(i)}
							onMouseLeave={this.setHiglited(-1)}
							onClick={this.rateClicked(i + 1)}
						/>
					);
				})}
			</div>
		);

		return (
			<div>
				{movie ? (
					<React.Fragment>
						<MovieDetail />
						<hr />
						<RateTheMovie />
					</React.Fragment>
				) : null}
			</div>
		);
	}
}
