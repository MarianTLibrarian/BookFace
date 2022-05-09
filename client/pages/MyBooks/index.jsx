import React from 'react';
import axios from 'axios';
import SideBar from './sidebar';
import useStore from '../../userStore';

const { router } = '../../../server/routes';


export default function MyBooks() {

  const { user } = useStore();
   console.log('user', user)

  const getBooks = function() {
    axios.get('/books')
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err);
    })
  }

  const componentDidMount = function() {
    getBooks()
    console.log('mounted')
  }

  componentDidMount();


    return(
      <div>
        <div className="sidebar">
          <SideBar />
        </div>
      </div>
    )

}

