import React from 'react';
import Loading from '../Common/Loading';
import { getUser, githubWar } from '../api/DataModel';
import Results from './results';
import PlayerInput from './PlayerInput';
import Confetti from 'react-dom-confetti';

const config = {
  angle: 90,
  spread: 45,
  startVelocity: 45,
  elementCount: 100,
  dragFriction: 0.1,
  duration: 1400,
  delay: 0,
  width: '10px',
  height: '10px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
};

const initial_state = {
  player1Name: '',
  player2Name: '',
  player1Info: '',
  player2Info: '',
  winner: '',
  looser: '',
  isLoading: false,
  startConfetti: true
};
export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = initial_state;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetPlayer = this.resetPlayer.bind(this);
    this.handleBattle = this.handleBattle.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.currentTarget.form.id + 'Name']: event.target.value
    });
  }

  handleSubmit(event) {
    let username = event.target.id;
    getUser(this.state[event.target.id + 'Name']).then(data => {
      this.setState({
        [username + 'Info']: data
      });
    });
    event.preventDefault();
  }

  resetPlayer(id) {
    if (typeof id === 'string') {
      this.setState({
        [id + 'Name']: '',
        [id + 'Info']: ''
      });
    } else {
      this.setState(initial_state);
    }
  }

  handleBattle() {
    if (this.state.player1Name === this.state.player2Name) {
      alert('please select different names for players');
    } else {
      this.setState({
        isLoading: !this.state.isLoading
      });
      setTimeout(
        function() {
          this.setState({
            isLoading: !this.state.isLoading
          });
        }.bind(this),
        2000
      );

      githubWar([this.state.player1Name, this.state.player2Name]).then(data => {
        this.setState({
          winner: data[0],
          looser: data[1]
        });
      });

      this.setState({
        startConfetti: !this.state.startConfetti
      });

      setTimeout(() => {
        this.setState({
          startConfetti: !this.state.startConfetti
        });
      }, 2000);
    }
  }

  render() {
    let player1, player2;
    let winner = this.state.winner;
    let looser = this.state.looser;
    if (this.state.player1Info === '') {
      player1 = (
        <PlayerInput
          id='player1'
          label='Profile 1'
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      );
    } else {
      player1 = this.state.player1Info ? (
        winner && looser ? (
          <Results
            warStart={true}
            score={winner.score}
            userdata={winner.userdata}
            id='winner'
          />
        ) : (
          <Results
            warStart={false}
            id='player1'
            label='Profile 1'
            resetPlayer={this.resetPlayer}
            userdata={this.state.player1Info}
          />
        )
      ) : (
        (alert('Cannot find user: ' + this.state.player1Name),
        this.setState({ player1Info: '' }))
      );
    }
    if (this.state.player2Info === '') {
      player2 = (
        <PlayerInput
          id='player2'
          label='Profile 2'
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      );
    } else {
      player2 = this.state.player2Info ? (
        winner && looser ? (
          <Results
            warStart={true}
            score={looser.score}
            userdata={looser.userdata}
            id='looser'
          />
        ) : (
          <Results
            warStart={false}
            id='player2'
            label='Profile 2'
            resetPlayer={this.resetPlayer}
            userdata={this.state.player2Info}
          />
        )
      ) : (
        (alert('Cannot find user: ' + this.state.player2Name),
        this.setState({ player2Info: '' }))
      );
    }
    if (!this.state.isLoading) {
      return (
        <div className=' container'>
          <div className='row'>
            <div className='col-md-5'>
              {player1}
              <div className='confetti'>
                <Confetti active={this.state.startConfetti} config={config} />
              </div>
            </div>
            <div className=' battlebtn col-md-2'>
              {this.state.player1Info && this.state.player2Info ? ( //if player1 and player2 are submitted
                winner && looser ? ( // if battle started
                  <button
                    className=' btn btn-primary'
                    id='resetall'
                    onClick={this.resetPlayer}
                  >
                    Reset All
                  </button>
                ) : (
                  <button
                    className=' btn btn-primary'
                    onClick={this.handleBattle}
                  >
                    battle
                  </button>
                )
              ) : (
                <h1>V/S</h1>
              )}
            </div>
            <div className='col-md-5'>{player2}</div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}
