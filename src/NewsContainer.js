import React, { Component } from "react";
import wretch from 'wretch';

import {getUrl, transformSearchResponse} from './helpers/transform';
import { getPostsType } from "./helpers/utils";

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
		const url = getUrl(postsType);

		// Use wretch to make API calls. wretch is a wrapper around fetch
		wretch(url).get(url).json(data => {
			const { page, nbPages} = data;
			const posts = transformSearchResponse(data);

			this.setState({page, nbPages, posts});
		}).catch(error => {
			alert(`Error fetching ${postsType} posts`);
			console.log('Error fetching posts', error);
		});
	}
	renderPost(post){
		return (
			<tr key={post.objectID}>
				<td>
					<span>{post.num_comments}</span>
					<span>{post.points}</span>
					<button>^</button>
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
