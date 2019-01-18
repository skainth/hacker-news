import React, { Component } from "react";

import { getPostsType } from "./helpers/utils";
import { getPosts, postUpvote } from "./api";

class NewsContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			// Posts to show
			posts: [],
			// Current page
			page: 0,
			// Total number of pages
			nbPages: null
		};
	}
	componentDidMount(){
		this.fetchPosts(getPostsType(this.props.match.path));
	}
	componentDidUpdate(prevProps){
		const currentPostsType = getPostsType(this.props.match.path);
		const prevPostsPath = getPostsType(prevProps.match.path);

		if(currentPostsType !== prevPostsPath){
			this.fetchPosts(currentPostsType);
		}
	}
	fetchPosts(postsType){
		getPosts(postsType).then(data => {
			const {page, nbPages, posts} = data;
			this.setState({page, nbPages, posts})
		}).catch(error => {
			alert(`Error fetching ${postsType} posts`);
			console.log('Error fetching posts', error);
		});
	}
	upvoteClick = event => {
		const { objectid, upvotecount } = event.currentTarget.dataset;
		postUpvote(objectid, upvotecount).then(({postId, votes}) => {
				const { posts } = this.state;
				const clonedPosts = [...posts];
				const postFound = clonedPosts.find(post => post.objectID === postId);

				if(postFound){
					postFound.points = votes;
					this.setState({posts: clonedPosts});
				}
			}).catch(error => {
			alert('Error saving upvote');
			console.log('error saving upvote', error)
		});
	}
	renderPost = post=> {
		return (
			<tr key={post.objectID}>
				<td>
					<span>{post.num_comments}</span>
					<span>{post.points}</span>
					<button onClick={this.upvoteClick} data-objectid={post.objectID} data-upvotecount={post.points}>^</button>
					<a href={post.url}>{post.title}</a>
					by<span>{post.author}</span>
					<span>3 hours ago</span>
					[<button>hide</button>]
					</td>
			</tr>
		);
	}
	render(){
		const { posts } = this.state;
		return (
			<table>
				<tbody>
					{posts.map(this.renderPost)}
				</tbody>
			</table>
		);
	}
}

export default NewsContainer;
