import config from '../config';

const transformSearchResponse = (data) => {
	const { hits = [] } = data;
	const posts = [];

	// List of attributes to pick out from the API response
	const attrs = ["objectID", "author", "created_at", "num_comments", "points", "title", "url" ];

	hits.forEach(post => {
		const postData = {};
		attrs.forEach(attr => postData[attr] = post[attr]);
		posts.push(postData);
	});
	return posts;
};

const getUrl = (postsType) => {
	const url = config.postTypes[postsType];
	if(url){
		return url;
	}
	throw new Error(`Unsupported postsType ${postsType}`);
};
export { transformSearchResponse, getUrl };
