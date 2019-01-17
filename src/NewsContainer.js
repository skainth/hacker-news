import React, { Component } from "react";

class NewsContainer extends Component {
	render(){
		const { match: { path } } = this.props;
		const newsType = path.replace('/', '');
		return <div>{`show ${newsType} posts`}</div>;
	}
}

export default NewsContainer;
