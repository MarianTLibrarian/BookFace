import React from 'react';
import axios from 'axios';
import SideBar from './sidebar.jsx';
import useStore from './useStore';

const { personalBooks } = require('../../../server/controllers/books.js')

const { user } = useStore();
console.log(user);




class BookShelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageview: "",
      books: []
    }

  }

 componentDidMount() {
   this.getBooks();
 }

 getBooks () {

 }



  render() {
    return(
      <div>
        <div classname="sidebar">
          <SideBar />

        </div>
      </div>
    )
  }
}


