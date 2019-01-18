import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NewsList extends Component{
	renderPost = post=> {
		const { upvoteClick, hidePostClick } = this.props;
		return (
			<tr key={post.objectID}>
				<td>
					<span>{post.num_comments}</span>
					<span>{post.points}</span>
					<button onClick={upvoteClick} data-objectid={post.objectID} data-upvotecount={post.points}>^</button>
					<a href={post.url}>{post.title}</a>
					by<span>{post.author}</span>
					<span>3 hours ago</span>
					[<button onClick={hidePostClick} data-objectid={post.objectID}>hide</button>]
				</td>
			</tr>
		);
	}
	render(){
		const { posts } = this.props;
		return (
			<table>
				<tbody>
					{posts.map(this.renderPost)}
				</tbody>
			</table>
		);
	}
}

NewsList.propTypes = {
	posts: PropTypes.array,
	upvoteClick: PropTypes.func,
	hidePostClick: PropTypes.func,
};

export default NewsList;
