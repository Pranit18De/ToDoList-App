import React from 'react';
import { AppRegistry, View, Text } from 'react-native';
//import {name as appName} from './app.json';
//import App from './App';
import Main from './src/components/Main';
import Header from './src/components/header';



const App = () => {

return(
    <View style= {{flex: 1}}>
    <Header headerText= 'ToDolist'/>
    <Main />
    </View>



);
};







AppRegistry.registerComponent('todolist', () => App);

