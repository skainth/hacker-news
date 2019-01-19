import config from '../config';
import moment from 'moment';

const transformSearchResponse = data => {
	const { hits = [] } = data;
	const posts = [];

	// List of attributes to pick out from the API response
	const attrs = ["objectID", "author", "created_at", "num_comments", "points", "title", "url" ];

	hits.forEach(post => {
		const postData = {};
		attrs.forEach(attr => postData[attr] = post[attr]);
		postData['host'] =  post.url? (new URL(post.url).host) : '';
		postData.time = moment(post.created_at).fromNow();
		posts.push(postData);
	});
	return posts;
};

const getUrl = (postsType, page) => {
	const url = config.postTypes[postsType] + (page? `&page=${page}`: '');
	if(url){
		return url;
	}
	throw new Error(`Unsupported postsType ${postsType}`);
};
export { transformSearchResponse, getUrl };
