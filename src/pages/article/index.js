import React from 'react';

class ArticlePage extends React.Component {
	componentDidMount() {
		const { getArticle, match } = this.props;
		getArticle(match.params.id);
	}

	render() {
		const { article } = this.props;
		if (!article) {
			return null;
		}
		return (
			<div className="article-page">
				<div className="banner">
					<div className="container">
						<h1>{article.title}</h1>
					</div>
				</div>
				<div className="container page">
					<div className="row article-content">
						<div className="col-xs-12">
							<p>{article.description}</p>
							<ul className="tag-list">
								{
									article.tagList && article.tagList.map(tag => {
										return (
											<li
												className="tag-default tag-pill tag-outline"
												key={tag}>
												{tag}
											</li>
										);
									})
								}
							</ul>
						</div>
					</div>
					<hr/>
				</div>
			</div>
		);
	}
}

export default ArticlePage;
