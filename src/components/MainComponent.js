import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

// localdependencies
import Navbar from "./Common/Navbar";
import Home from "./HomeComponent";
import Battle from './War/Battle';
import Popular from './Popular/popular';
import Search from './Search/search';
import PieChart from './PieChart/PieChart'


export default class Main extends React.Component{
   
    render(){
        return(
            <div>
            <Navbar/>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/battle" exact component={Battle}/>
                <Route path="/popular" component={Popular}/>
                <Route path="/search" component={Search}/>
                <Route path="/pie" component={PieChart}/>
                <Redirect to ="/home"/>
            </Switch>
            </div>
        )
    }
}