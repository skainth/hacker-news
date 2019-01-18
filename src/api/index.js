import wretch from "wretch";
import {getUrl, transformSearchResponse} from "../helpers/transform";

const storage = localStorage;
const votesKey = 'votes';
const hiddenPostsKey = 'hide';

const getSavedVotes = () => {
	return JSON.parse(storage.getItem(votesKey) || '{}');
};

const getHiddenPosts = () => {
	return JSON.parse(storage.getItem(hiddenPostsKey) || '[]');
};

const postUpvote = (postId, currentVoteCount) => {
	const votes = getSavedVotes();

	if(votes[postId]){
		votes[postId] = Number(votes[postId]) + 1;
	}else{
		votes[postId] = Number(currentVoteCount) + 1;
	}
	storage.setItem(votesKey, JSON.stringify(votes));
	return Promise.resolve({postId, votes: votes[postId]});
};

const hidePost = postId => {
	const hiddenPosts = getHiddenPosts();
	hiddenPosts.push(postId);

	storage.setItem(hiddenPostsKey, JSON.stringify(hiddenPosts));

	return Promise.resolve(postId);
};

const getPosts = (postsType, page) => {
	/*
	1. Fetch data from API
	2. Transform the data
	3. Update the transformed data using data available in localStorage
	4. Remove the hidden posts
	 */

	const url = getUrl(postsType, page);

	// wretch is a wrapper around fetch
	return wretch(url).get(url).json(data => {
		const { page, nbPages } = data;
		let posts = transformSearchResponse(data);

		const savedVotes = getSavedVotes();

		for(const postId in savedVotes){
			const voteCount = savedVotes[postId];
			const postFound = posts.find(post => post.objectID === postId);

			if(postFound){
				postFound.points = voteCount;
			}
		}

		const hiddenPosts = getHiddenPosts();

		hiddenPosts.forEach(post => {
			const filteredPosts = posts.filter(post => {
				return !hiddenPosts.includes(post.objectID);
			});
			posts = filteredPosts;
		});
		return {page, nbPages, posts};
	});
};

export { postUpvote, getPosts, hidePost };
