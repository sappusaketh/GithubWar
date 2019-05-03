import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/MainComponent';

class App extends Component {
  // componentDidMount() {
  //   // console.log(window.effect);
  //   this.effect = window.VANTA.WAVES({
  //     el: '#app'
  //   });
  // }
  // componentWillUnmount() {
  //   if (this.effect) this.effect.destroy();
  // }
  render() {
    return (
      <BrowserRouter>
        <div id='app' className='App'>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
