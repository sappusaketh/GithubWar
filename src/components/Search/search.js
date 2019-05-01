import React from 'react';

// componentImport

import UserProfileCard from './UserProfile';
import {getUser,getRepos} from '../api/DataModel';
import UserRepos from './UserRepos';

export default class Search extends React.Component{
  
    constructor(props) {
        super(props);
        this.state = {
          user: null,
          userInfo:null,
          repos:null
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
          // console.log(event.target.value)
        this.setState({user: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        // console.log("submitted value : "+this.state.user)
        getUser(this.state.user).then((data)=>{
          this.setState({
            userInfo:data
          })
        })
        getRepos(this.state.user).then((data)=>{
          this.setState({
            repos:data
          })
        })
      }
     
      

    render(){
        
        return(
            <div>
                <h1>Enter a Github username</h1>
                <form onSubmit={this.handleSubmit}>
                    <input  className="searchinput form-control"  onChange={this.handleChange} type="text" name='search' id="search" placeholder="Github Username"/><br/>
                    <button type="submit" className="searchbtn btn btn-primary" disabled={!this.state.user} >Search</button>
                </form>
                { this.state.userInfo ? <UserProfileCard user={this.state.userInfo}/>: ""}
                
                { this.state.repos ? <UserRepos repos={this.state.repos}/>: ""}
                
            </div>
        )
    }
}