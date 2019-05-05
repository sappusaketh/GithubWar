import React from 'react';
import { Navbar, NavbarToggler, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div className='customNav'>
        <Navbar className='navbar-expand-md' dark>
          <NavLink className='navbar-brand active nav-link' to='/home'>
            GitHub Analyzer
          </NavLink>
          <NavbarToggler onClick={this.toggleNavbar} className='mr-2' />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <ul className='ml-auto navbar-nav'>
              <li className='  nav-item'>
                <NavLink className='nav-link' to='/home'>
                  Home
                </NavLink>
              </li>
              <li className=' nav-item'>
                <NavLink className='nav-link' to='/popular'>
                  Popular
                </NavLink>
              </li>
              <li className=' nav-item'>
                <NavLink className='nav-link' to='/battle'>
                  Battle
                </NavLink>
              </li>

              <li className=' nav-item'>
                <NavLink className='nav-link' to='/search'>
                  Search
                </NavLink>
              </li>
            </ul>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
