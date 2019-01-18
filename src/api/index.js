// While making API call we do not need currentVoteCount
// It is needed for locally storing the voteCount
import wretch from "wretch/dist/index";
import {getUrl, transformSearchResponse} from "../helpers/transform";

const storage = localStorage;
const votesKey = 'votes';

const getSavedVotes = () => {
	return JSON.parse(storage.getItem(votesKey) || '{}');
}
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

const getPosts = postsType => {
	/*
	1. Fetch data from API
	2. Transform the data
	3. Update the transformed data using data available in localStorage
	 */

	const url = getUrl(postsType);

	// wretch is a wrapper around fetch
	return wretch(url).get(url).json(data => {
		const { page, nbPages } = data;
		const posts = transformSearchResponse(data);

		const savedVotes = getSavedVotes();

		for(const postId in savedVotes){
			const voteCount = savedVotes[postId]
			const postFound = posts.find(post => post.objectID === postId);

			if(postFound){
				postFound.points = voteCount;
			}
		}
		return {page, nbPages, posts};
	});
};

export { postUpvote, getPosts };
