import React from 'react';

const myInput = (props) => {
	let inputElement = null;
	const inputClasses = ['form-control'];

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push('invalid');
	}

	switch (props.elementType) {
		case ('input'):
			inputElement = <input
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				onChange={props.changed}
				onBlur={props.blurred}
				onKeyPress={props.keyPressed}
				value={props.value}
			/>;
			break;
		case ('textarea'):
			inputElement = <textarea
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}/>;
			break;
		case ('select'):
			inputElement = (
				<select
					className={inputClasses.join(' ')}
					value={props.value}
					onChange={props.changed}>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = <input
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				onChange={props.changed}
				onBlur={props.blurred}
				onKeyPress={props.keyPressed}
				value={props.value}
			/>;
	}

	return (
		<div className="form-group">
			{ props.label && <label>{props.label}</label> }
			{inputElement}
		</div>
	);

};

export default myInput;
