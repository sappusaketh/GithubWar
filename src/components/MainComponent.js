import React from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

// localdependencies
import Navbar from "./Navbar";
import Home from "./HomeComponent";
import Battle from './Battle';
import Popular from './popular';
import Search from './search';


export default class Main extends React.Component{
    sendparamstopopular=({match})=>{
        return(
            <Popular match={match}/>
        )
    }
    render(){
        return(
            <div>
            <Navbar/>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/battle" exact component={Battle}/>
                <Route path="/popular" component={Popular}/>
                <Route path="/search" component={Search}/>
                <Redirect to ="/home"/>
            </Switch>
            </div>
        )
    }
}