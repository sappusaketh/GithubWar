import React from 'react';
import Axios from 'axios';


// componentImport

import UserProfileCard from './userProfile';

export default class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          user: null,
          userInfo:null,
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
          // console.log(event.target.value)
        this.setState({user: event.target.value});
      }
    
      handleSubmit(event) {
        console.log("submitted value : "+this.state.user)
        this.getUser(this.state.user)
        event.preventDefault();
      }
      
      getUser(userName){
        Axios.get(`https://api.github.com/users/${userName}`)
          .then(results => {
               this.setState({
                userInfo:results.data
              })

            }).catch( (error) => {console.log(error);});
      }

    render(){
        
        return(
            <div>
                <h1>Enter a Github username</h1>
                <form onSubmit={this.handleSubmit}>
                    <input  className="searchinput form-control"  onChange={this.handleChange} type="text" name='search' id="search" placeholder="Github Username"/><br/>
                    <button type="submit" className="searchbtn btn btn-primary" disabled={!this.state.user} >Search</button>
                    { this.state.userInfo ? <UserProfileCard user={this.state.userInfo}/>: ""}
                </form>
            </div>
        )
    }
}