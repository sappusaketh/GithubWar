import React from 'react';
import { Link } from 'react-router-dom';
export default class HomeComponnet extends React.Component {
  componentDidMount() {
    // console.log(window.effect);
    this.effect = window.VANTA.BIRDS({
      el: '#test',
      backgroundColor: '#f8e8cf',
      colorMode: 'variance'
      // position: 'fixed'
    });
  }
  componentWillUnmount() {
    if (this.effect) this.effect.destroy();
  }
  render() {
    return (
      <div className='  container'>
        <h1 className='customMargin'> this is home page</h1>
        <Link className=' btn btn-primary' to='/battle'>
          Battle
        </Link>
      </div>
    );
  }
}
