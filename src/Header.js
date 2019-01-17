import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component{
	render(){
		return (<>
			<NavLink to='/top'>top</NavLink>
			<NavLink to='/new'>new</NavLink>
		</>);
	}
}

export default Header;
