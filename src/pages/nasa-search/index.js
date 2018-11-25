import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import collectionService from '../../services'
import MyInput from '../../components/input';
import SearchResult from './SearchResult';
import MyModal from '../../components/modal';
import validators from '../../helpers/validators';
import { VIDEO } from '../../constants'

class NasaSearchPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchInput: '',
			searchKey: '',
			searchResult: [],
			isShowItemDetail: false,
			itemDetail: null,
			formData: {
				title: '',
				description: '',
				mediaType: VIDEO,
				thumbnailSrc: '',
				videoSrc: '',
			},
		};

		this.validators = validators;
		this.resetValidators();
	}

	handleChange = event => {
		this.setState({ searchInput: event.target.value });
	};

	handleKeyPress = event => {
		if (event.key === 'Enter') {
			event.target.blur();
		}
	};

	handleBlur = () => {
		if (this.state.searchInput && this.state.searchInput !== this.state.searchKey) {
			collectionService.searchItem(this.state.searchInput)
				.then(rs => {
					this.setState({ searchResult: rs, searchKey: this.state.searchInput });
				});
		}
	};

	showItemDetails = item => {
		if (item.data.media_type === VIDEO) {
			axios.get(item.href)
				.then(res => {
					const thumbnailSrc = res.data.find(el => el.includes('preview_thumb_00002.png'));
					const videoSrc = res.data.find(el => el.includes('~orig'));
					this.setState({
						isShowItemDetail: true,
						itemDetail: item,
						formData: {
							title: item.data.title,
							description: item.data.description,
							mediaType: item.data.media_type,
							thumbnailSrc: thumbnailSrc,
							videoSrc: videoSrc,
						}
					});
				});
		} else {
			this.setState({
				isShowItemDetail: true,
				itemDetail: item,
				formData: {
					title: item.data.title,
					description: item.data.description,
					mediaType: item.data.media_type,
					thumbnailSrc: item.links.href,
					videoSrc: '',
				},
			})
		}
	};

	closeDetail = () => {
		this.setState({ isShowItemDetail: false });
	};

	handleInputChange = (event, inputField) => {
		const newState = { ...this.state };
		newState.formData[event.target.name] = event.target.value;
		this.setState(newState);
		if (inputField) {
			this.updateValidators(inputField, event.target.value);
		}
	};

	updateValidators = (fieldName, value) => {
		this.validators[fieldName].errors = [];
		this.validators[fieldName].state = value;
		this.validators[fieldName].isTouched = true;
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
			this.validators[fieldName].isTouched = false;
		});
	};

	isFormValid() {
		let status = true;
		Object.keys(this.validators).forEach((field) => {
			if (!this.validators[field].valid) {
				status = false;
			}
		});
		return status;
	}

	handleSubmit = event => {
		if (this.isFormValid()) {
			event.preventDefault();
			collectionService.createItem(this.state.formData)
				.then(() => this.closeDetail())
				.catch(error => console.log(error));
		}
	};

	render() {
		const {
			isShowItemDetail,
			searchInput,
			searchKey,
			searchResult,
			formData,
		} = this.state;

		return (
			<div className="row nasa-search">
				<div className="col-12">
					<Link to="/">
						<button className="btn btn-outline-primary">
							<i className="fa fa-chevron-left mr-3"/>
							<span>Back to Collection</span>
						</button>
					</Link>
				</div>

				<div className="col-12 my-4">
					<h2>Search from Nasa</h2>
				</div>

				<div className="col-12">
					<MyInput
						value={searchInput}
						changed={this.handleChange}
						blurred={this.handleBlur}
						keyPressed={this.handleKeyPress}
					/>
				</div>

				{searchResult.length > 0 && (
					<SearchResult
						data={searchResult}
						searchKey={searchKey}
						showDetails={this.showItemDetails}
					/>)
				}

				{isShowItemDetail && (

					<MyModal
						isOpen={isShowItemDetail}
						toggle={this.closeDetail}
						title="Add to collection"
						onClick={this.handleSubmit}
						buttonLabel="Add to collection"
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
									value={formData.title}
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
									value={formData.description}
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
								<label htmlFor="thumbnailSrc">Link preview image*</label>
								<input
									type="text"
									className="form-control"
									id="thumbnailSrc"
									placeholder="Link preview image"
									value={formData.thumbnailSrc}
									name="thumbnailSrc"
									onBlur={this.updateValidators('thumbnailSrc', formData.thumbnailSrc)}
									onChange={event => this.handleInputChange(event, 'thumbnailSrc')}
								/>
								{ this.displayValidationErrors('thumbnailSrc') }
							</div>

							<div className="form-group">
								<label htmlFor="videoSrc">Video link*</label>
								<input
									type="text"
									className="form-control"
									id="videoSrc"
									placeholder="Video link"
									value={formData.videoSrc}
									name="videoSrc"
									onBlur={this.updateValidators('videoSrc', formData.videoSrc)}
									onChange={event => this.handleInputChange(event, 'videoSrc')}
								/>
								{ this.displayValidationErrors('videoSrc') }
							</div>
						</form>
					</MyModal>
				)}
			</div>
		);
	}
}

NasaSearchPage.propTypes = {};

export default NasaSearchPage;
