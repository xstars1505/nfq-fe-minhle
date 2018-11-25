import React from 'react';
import './item-card.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { VIDEO } from '../../constants'

class ItemCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowItemDetail: false,
			thumbnailSrc: '',
			videoSrc: '',
		};
	}

	componentDidMount() {
		const mediaLink = this.props.mediaLink;
		if (mediaLink && mediaLink.includes('json')) {
			axios.get(mediaLink)
				.then(res => {
					const thumbnailSrc = res.data.find(el => el.includes('preview_thumb_00002.png'));
					const videoSrc = res.data.find(el => el.includes('~orig'));
					this.setState({
						videoSrc: videoSrc,
						thumbnailSrc: thumbnailSrc,
					});
				});
		} else {
			this.setState({ thumbnailSrc: mediaLink})
		}
	}

	handleClick = () => {
		this.setState({isShowItemDetail: true});
	};

	render() {
		const { thumbnailSrc, videoSrc } = this.state;
		const { title, description , mediaType, createdDate, children } = this.props;

		return (
			<div className="col-12 col-sm-6 col-md-4 mb-4 item-card">
				<div className="card">
					<Link
						to={{
							pathname: '/media',
							state: {
								mediaType: mediaType,
								mediaSrc: mediaType === VIDEO ? videoSrc : thumbnailSrc,
							}
						}}>
						<div className="image-container">
							{thumbnailSrc && <img className="card-img-top" src={thumbnailSrc} /> }
							<div className="overlay">
								<span className="icon">
									<i className="fa fa-play-circle" />
								</span>
							</div>
						</div>
					</Link>
					<div className="card-body">
						<div className="meta-data">
							<span>{ mediaType }</span>
							<span>{ createdDate }</span>
						</div>
						<h5 className="card-title">{ title }</h5>
						<p className="card-text">{ description }</p>
					</div>
					<div className="card-footer bg-transparent border-0">
						{ children }
					</div>
				</div>
			</div>
		);
	}
}

export default ItemCard;
