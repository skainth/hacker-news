import { shallow } from 'enzyme';
import React from 'react';
import NewsList from '..';

const mockClick = jest.fn();

const posts = [
	{
		"objectID": "18937464",
		"author": "skilled",
		"created_at": "2019-01-18T06:38:46.000Z",
		"num_comments": 0,
		"points": 6,
		"title": "Animating CSS Grid",
		"url": "https://css-irl.info/animating-css-grid/"
	},
	{
		"objectID": "18937455",
		"author": "aharm",
		"created_at": "2019-01-18T06:34:51.000Z",
		"num_comments": null,
		"points": 1,
		"title": "Iris Automation Is Hiring a Computer Vision Expert – AI for Drones",
		"url": "http://www.irisonboard.com/careers/"
	},
	{
		"objectID": "18937278",
		"author": "rococode",
		"created_at": "2019-01-18T05:44:33.000Z",
		"num_comments": 2,
		"points": 8,
		"title": "GitHub dashboard UI refresh",
		"url": "https://github.blog/2019-01-16-dashboard-ui-refresh/"
	},
];

const props = {
	posts,
	upvoteClick: mockClick,
	hidePostClick: mockClick,
};
describe('NewsList', () => {
	it('gets rendered', () => {
		const wrapper = shallow(<NewsList {...props} />);
		expect(wrapper).toMatchSnapshot();
	})
});

