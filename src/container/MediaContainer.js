import React from 'react';
import MediaPage from '../pages/media';
import { withRouter } from 'react-router-dom';

class MediaContainer extends React.Component {
	render() {
		const { mediaType, mediaSrc } = this.props.location.state;

		return (
			<MediaPage mediaType={mediaType} mediaSrc={mediaSrc}/>
		);
	}
}

export default withRouter(MediaContainer);
