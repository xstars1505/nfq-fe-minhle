import React from 'react';

const Button = props => {
	const { title, onClick, children } = props;

	return (
		<button
			className="btn btn-primary"
			onClick={onClick}>
			{ title }
			{ children }
		</button>
	);
};

Button.propTypes = {};

export default Button;
