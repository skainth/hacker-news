import React, { Component } from "react";

import NewsList from '../components/NewsList/index';
import { getPostsType } from "../helpers/utils";
import {getPosts, hidePost, postUpvote} from "../api/index";

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
			this.setState({posts: [], nbPages: null, page: 0}, () => {
				this.fetchPosts(currentPostsType);
			});
		}
	}

	fetchPosts(postsType, page){
		getPosts(postsType, page).then(data => {
			const {page, nbPages, posts} = data;
			this.setState({page, nbPages, posts: [...this.state.posts, ...posts]})
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
	hidePostClick = event => {
		const { objectid } = event.currentTarget.dataset;
		hidePost(objectid).then(postId => {
			const { posts } = this.state;
			const clonedPosts = [...posts];
			const filteredPosts = clonedPosts.filter(post => post.objectID !== postId);

			this.setState({posts: filteredPosts});
		}).catch(error => {
			alert('Error hiding post');
			console.log('Error hiding post', error);
		});
	}
	moreClick = () => {
		const { page } = this.state;
		this.fetchPosts(getPostsType(this.props.match.path), page + 1);
	}
	render(){
		const { posts } = this.state;
		const { page, nbPages } = this.state;
		return (
			<>
				<NewsList posts={posts} upvoteClick={this.upvoteClick} hidePostClick={this.hidePostClick} />
				{(page + 1) < nbPages &&  <button onClick={this.moreClick}>More</button>}
			</>
		);
	}
}

export default NewsContainer;
