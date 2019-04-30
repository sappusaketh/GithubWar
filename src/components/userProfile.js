import  React from 'react';
import {Card,  CardImg, CardTitle} from 'reactstrap'

// staless component

function UserProfileCard(props){
    let user=props.user;
    // console.log(user)
    let created=new Date(user.created_at)
    created=created.toLocaleDateString('en-US',{year:'numeric',month:'long'})
    // console.log(created)
    return(
        <div className="container">

        <div className="row">
        <Card className="col-md-8">
           
            <div className="row">
              
                <div className="col-md-4">
                <CardImg className="propic"src={user.avatar_url}  alt={user.login}/>
                <CardTitle><h4>@{user.login}</h4></CardTitle>
                </div>
                
                <div className="col-md-4">
                    <ul className='list-group list-group-flush'>
                        {user.name?<li className="list-group-item"><h6>{user.name}</h6></li>:''}
                        {user.location?<li className="list-group-item">{user.location}</li>:''}
                        {user.bio? <li className="list-group-item">{user.bio}</li>:''}
                    </ul>
                </div>
                <div className="col-md-4">
                <ul className='list-group list-group-flush'>
                        <li className="list-group-item">Repositories:{user.public_repos}</li>
                        <li className="list-group-item">Gists:{user.public_gists}</li>
                        <li className="list-group-item">Followers:{user.followers}</li>
                        <li className="list-group-item">Following:{user.following}</li>
                        <li className="list-group-item">Joined:{created}</li>

                </ul>
                </div>  
               
                   
             
            </div>
        </Card>
        </div>
        </div>
    )
}

export default UserProfileCard;