import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

class Header extends Component{
	render(){
		return (<div className='header'>
			<NavLink to='/top' activeClassName='active' className='headerlink'>top</NavLink>|
			<NavLink to='/new' activeClassName='active' className='headerlink'>new</NavLink>
		</div>);
	}
}

export default Header;
