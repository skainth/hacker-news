import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.css';

class NewsList extends Component{
	renderPost = (post, index) => {
		const { upvoteClick, hidePostClick } = this.props;
		return (
			<div key={post.objectID} className={`row ${index % 2 === 0? "evenRow": "oddRow"}`}>
				<span className='firstClass'>
					<span className='info comments'>{post.num_comments}</span>
					<span className='points'>{post.points}</span>
					<span className='info upvote'
								onClick={upvoteClick} data-objectid={post.objectID} data-upvotecount={post.points}>
							&#9650;
					</span>
					<span className='title'><a href={post.url} aria-label={post.title}>{post.title}</a> </span>
					<span>(<a className='info' href={post.url}>{post.host}</a>) </span>
				</span>
				<span className='secondClass'>
					<span className='info'>by <span className='title'>{post.author}</span>  </span>
					<span className='info'>{post.time}</span>
					<span className='info hidepost helper-spacing-left'>[ <span className='title' onClick={hidePostClick} data-objectid={post.objectID}>hide</span> ]</span>
				</span>
			</div>
		);
	}
	render(){
		const { posts = [] } = this.props;
		return (
			<div className='postsContainer'>{posts.map(this.renderPost)}</div>

		);
	}
}

NewsList.propTypes = {
	posts: PropTypes.array,
	upvoteClick: PropTypes.func,
	hidePostClick: PropTypes.func,
};

export default NewsList;
