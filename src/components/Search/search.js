import React from 'react';

// componentImport

import UserProfileCard from './UserProfile';
import {getUser,getRepos, getUserLanguage} from '../api/DataModel';
import UserRepos from './UserRepos';
import PieChart from '../PieChart/PieChart';
import Loading  from'../Common/Loading'

export default class Search extends React.Component{
  
    constructor(props) {
        super(props);
        this.state = {
          user: null,
          userInfo:null,
          repos:null,
          langData:null,
          isLoading:false
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

        this.setState({
        isLoading:!this.state.isLoading,
      })
        // console.log("submitted value : "+this.state.user)
        getUserLanguage(this.state.user).then((data)=>{
          this.setState({
            langData:data,
          })
        })
        
        getUser(this.state.user).then((data)=>{
          this.setState({
            userInfo:data
          })
        })

        getRepos(this.state.user).then((data)=>{
          this.setState({
            repos:data,
            user:null
          })
        })
        
        setTimeout(() => {
          this.setState({
            isLoading:!this.state.isLoading
          })
        }, 2000);
      }
     
      

    render(){
      let isLoading= this.state.isLoading
        if(isLoading){
          return(<Loading/>)
        }else{
          return(
              <div>
                  <h1>Enter a Github username</h1>
                  <form onSubmit={this.handleSubmit}>
                      <input  className="searchinput form-control"  onChange={this.handleChange} type="text" name='search' id="search" placeholder="Github Username"/><br/>
                      <button type="submit" className="searchbtn btn btn-primary" disabled={!this.state.user} >Search</button>
                  </form>
                  { this.state.userInfo ? <UserProfileCard user={this.state.userInfo}/>: ""}
                  
                  {this.state.langData? <div className="Langview"><h1>Major Languages</h1><PieChart data={this.state.langData}/></div>:""}

                  { this.state.repos ? <UserRepos repos={this.state.repos}/>: ""}
                  
              </div>
          )
    }
  }

}