import React, { Component } from 'react';
import {Provider} from 'react-redux';
import PopUp from './components/modal';
import store from './components/connect'



class App extends Component {

  render() {
    return (
       <Provider store={store}>
          <PopUp/>

       </Provider>
    );
  }
}


export default App;

