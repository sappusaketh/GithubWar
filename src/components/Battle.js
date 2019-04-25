import React from "react";

export default class Battle extends React.Component{
    constructor(props){
        super(props)
        this.state={
            player1Name:"",
            player2Name:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        
        if(event.currentTarget.form.id==="player1"){
            this.setState({player1Name: event.target.value});
        }else if(event.currentTarget.form.id==="player2"){
            this.setState({player2Name: event.target.value});
        }
      }
    
    handleSubmit(event) {
    if(event.target.id==="player1"){
        alert("player1: "+this.state.player1Name);
        this.setState({player1Name: event.target.value});

    }else if(event.target.id==="player2"){
        alert("player2: "+this.state.player2Name);
        this.setState({player2Name: event.target.value});
    }
    event.preventDefault();
    }    
    render(){
        return(
            <div className="container">
                
                <div className="row">
                    <div className="col-md-6">
                        <form id="player1"onSubmit={this.handleSubmit}>
                            <h1> Player1</h1>
                            <input  className="playersearchinput form-control" value={this.state.player1Name} onChange={this.handleChange} type="text" name='search'  placeholder="Github Username"/><br/>
                            <button type="submit" className="searchbtn btn btn-primary" >Search</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <form id="player2" onSubmit={this.handleSubmit}>
                            <h1> Player2</h1>                        
                            <input  className="playersearchinput form-control" value={this.state.player2Name} onChange={this.handleChange} type="text" name='search'  placeholder="Github Username"/><br/>
                            <button type="submit" className="searchbtn btn btn-primary" >Search</button>
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}