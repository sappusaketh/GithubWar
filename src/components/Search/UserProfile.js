import React from 'react';
import { Card, CardImg, CardTitle } from 'reactstrap';

// staless component

function UserProfileCard(props) {
  let user = props.user;
  // console.log(user)
  let created = new Date(user.created_at);
  created = created.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
  // console.log(created)
  return (
    <div className='container'>
      <div className='row'>
        <Card className='col-md-9'>
          <div className='row p-4'>
            <div className='col-md-4'>
              <CardImg
                className='propic'
                src={user.avatar_url}
                alt={user.login}
              />
              <CardTitle className='mt-3'>
                <h4>@{user.login}</h4>
              </CardTitle>
            </div>

            <div className='col-md-4'>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  <strong>Name: </strong>
                  {user.name ? user.name : <>N/A</>}
                </li>
                <li className='list-group-item'>
                  <strong>Location: </strong>
                  {user.location ? user.location : <>N/A</>}
                </li>
                <li className='list-group-item'>
                  <strong>Bio: </strong>
                  {user.bio ? user.bio : <>N/A</>}
                </li>
              </ul>
            </div>
            <div className='col-md-4'>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  <strong>Repositories: </strong>
                  {user.public_repos}
                </li>
                <li className='list-group-item'>
                  <strong>Gists: </strong>
                  {user.public_gists}
                </li>
                <li className='list-group-item'>
                  <strong>Followers: </strong>
                  {user.followers}
                </li>
                <li className='list-group-item'>
                  <strong>Following: </strong>
                  {user.following}
                </li>
                <li className='list-group-item'>
                  <strong>Joined: </strong>
                  {created}
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default UserProfileCard;
