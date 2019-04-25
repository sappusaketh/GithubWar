import  React from 'react';
import {Card, CardBody, CardHeader, CardImg, CardTitle, CardText} from 'reactstrap'

// staless component

function UserProfileCard(props){
    let user=props.user;
    // console.log(typeof(user))
    return(
        <div>
            <Card>
                <CardHeader>
                    <CardImg src={user.avatar_url}  alt={user.login}/>
                    <CardTitle><h2>@{user.login}</h2></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText>
                        <ul>
                        <li>{user.name}</li>
                        <li>{user.location}</li>
                        <li>{user.bio}</li>
                        </ul>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default UserProfileCard;