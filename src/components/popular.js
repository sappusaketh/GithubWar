import React from 'react';


export default class Popular extends React.Component{
    
    render(){
      
        return(
            <div>
                <h1> this is {this.props.match.path} page</h1>
            </div>
        )
    }
}