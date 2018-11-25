import React from 'react';
import ListItems from './ListItems';
import LoadingComponent from '../../components/loading';
import MyModal from '../../components/modal';
import validators from '../../helpers/validators';

class HomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isShowItemEdit: false,
			itemDetail: null,
		};

		this.validators = validators;
		this.resetValidators();
	}

	static getDerivedStateFromProps(props, state) {
		if (props.item) {
			props.resetItem();
			props.loadItems();
		}
		return null;
	}

	componentDidMount() {
		const { loadItems } = this.props;
		loadItems();
	}

	handleToggleFavorite = item => {
		const { editItem } = this.props;
		item.isFavorite = !item.isFavorite;
		editItem(item)
	};

	handleDeleteItem = item => {
		const { deleteItem } = this.props;
		deleteItem(item)
	};

	handleEditItem = item => {
		this.setState({ isShowItemEdit: true, itemDetail: item })
	};

	closeEdit = () => {
		this.setState({ isShowItemEdit: false, itemDetail: null }, () => this.resetValidators())
	};

	handleInputChange = (event, inputField) => {
		const newState = { ...this.state };
		newState.itemDetail[event.target.name] = event.target.value;
		this.setState(newState);
		if (inputField) {
			this.updateValidators(inputField, event.target.value);
		}
	};

	updateValidators = (fieldName, value) => {
		this.validators[fieldName].errors = [];
		this.validators[fieldName].state = value;
		this.validators[fieldName].valid = true;
		this.validators[fieldName].rules.forEach((rule) => {
			if (!rule.test(value)) {
				this.validators[fieldName].errors.push(rule.message);
				this.validators[fieldName].valid = false;
			}
		});
	};

	displayValidationErrors = fieldName => {
		const validator = this.validators[fieldName];
		const result = '';
		if (validator && !validator.valid) {
			const errors = validator.errors.map((info, index) => {
				return <p className="error" key={index}>* {info}</p>;
			});

			return (
				<div className="invalid-feedback d-block">
					{errors}
				</div>
			);
		}
		return result;
	};

	resetValidators = () => {
		Object.keys(this.validators).forEach((fieldName) => {
			this.validators[fieldName].errors = [];
			this.validators[fieldName].state = '';
			this.validators[fieldName].valid = false;
		});
	};

	isFormValid = () => {
		let status = true;
		Object.keys(this.validators).forEach(field => {
			if (!this.validators[field].valid) {
				status = false;
			}
		});
		return status;
	};

	handleSubmit = event => {
		event.preventDefault();
		if (this.isFormValid()) {
			const { editItem } = this.props;
			editItem(this.state.itemDetail);
			this.closeEdit();
		}
	};

	render() {
		const { isShowItemEdit, itemDetail } = this.state;
		const { items, inProgress } = this.props;
		return (
			<div>
				<div className="row">
					{
						inProgress || !items
							? <LoadingComponent/>
							: (
								<ListItems
									items={items}
									editItem={this.handleEditItem}
									deleteItem={this.handleDeleteItem}
									toggleFavorite={this.handleToggleFavorite}
								/>
							)
					}
				</div>

				{isShowItemEdit && (
					<MyModal
						isOpen={isShowItemEdit}
						toggle={this.closeEdit}
						title="Edit"
						onClick={this.handleSubmit}
						buttonLabel="Save"
						disabledButton={!this.isFormValid()}
					>
						<form>
							<div className="form-group">
								<label htmlFor="title">Title</label>
								<input
									type="text"
									className="form-control"
									id="title"
									placeholder="Title"
									value={itemDetail.title}
									name="title"
									onChange={this.handleInputChange}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="description">Description</label>
								<input
									type="text"
									className="form-control"
									id="description"
									placeholder="Description"
									value={itemDetail.description}
									name="description"
									onChange={this.handleInputChange}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="mediaType">Type</label>
								<select
									id="mediaType"
									name="mediaType"
									className="form-control"
									onChange={this.handleInputChange}
								>
									<option value="video">Video</option>
									<option value="image">Image</option>
								</select>
							</div>

							<div className="form-group">
								<label htmlFor="thumbnailSrc">Link preview image</label>
								<input
									type="text"
									className="form-control"
									id="thumbnailSrc"
									placeholder="Link preview image"
									value={itemDetail.thumbnailSrc}
									name="thumbnailSrc"
									onBlur={this.updateValidators('thumbnailSrc', itemDetail.thumbnailSrc)}
									onChange={event => this.handleInputChange(event, 'thumbnailSrc')}
								/>
								{this.displayValidationErrors('thumbnailSrc')}
							</div>

							<div className="form-group">
								<label htmlFor="videoSrc">Video link</label>
								<input
									type="text"
									className="form-control"
									id="videoSrc"
									placeholder="Video link"
									value={itemDetail.videoSrc}
									name="videoSrc"
									onBlur={this.updateValidators('videoSrc', itemDetail.videoSrc)}
									onChange={event => this.handleInputChange(event, 'videoSrc')}
								/>
								{this.displayValidationErrors('videoSrc')}
							</div>
						</form>
					</MyModal>
				)}
			</div>
		);
	}
}

export default HomePage;
