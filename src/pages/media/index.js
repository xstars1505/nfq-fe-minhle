import React from 'react';
import { VIDEO } from '../../constants'

const MediaPage = props => {
	const { mediaType, mediaSrc } = props;

	return (
		<div>
			{mediaType === VIDEO ? (
				<div align="center" className="embed-responsive embed-responsive-16by9">
					<video controls className="embed-responsive-item">
						<source src={mediaSrc} type="video/mp4"/>
					</video>
				</div>
			) : <img src={mediaSrc}/>}
		</div>
	);
};

export default MediaPage;
