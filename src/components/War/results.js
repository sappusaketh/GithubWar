import React from 'react';
import { Card, CardImg, CardTitle } from 'reactstrap';

export default function Results(props) {
  let user = props.userdata;
  let warStart = props.warStart;
  return (
    <>
      {props.label ? <h1> {props.label}</h1> : <h1> {props.id}</h1>}
      {warStart ? <h2>Score: {props.score}</h2> : ''}
      <div
        className={props.id === 'winner' ? 'winnerRainbow wrapper' : 'wrapper'}
      >
        <Card className='battle'>
          <CardImg
            className='battlepic'
            src={user.avatar_url}
            alt={user.login}
          />
          <CardTitle>
            <h4>@{user.login}</h4>
          </CardTitle>
          {warStart ? (
            <>
              <h4>{user.name}</h4>
              <div className='stats'>
                <p className='col-4'>Followers: {user.followers}</p>
                <p className='col-8'>Following: {user.following}</p>
              </div>
              <div className='stats'>
                <p className='col-4'>Repositories: {user.public_repos}</p>
                <p className='col-8'>Gists: {user.public_gists}</p>
              </div>
            </>
          ) : (
            <button
              onClick={props.resetPlayer.bind(null, props.id)}
              className='btn btn-secondary'
            >
              reset
            </button>
          )}
        </Card>
      </div>
    </>
  );
}
