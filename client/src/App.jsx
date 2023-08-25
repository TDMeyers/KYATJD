import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import './App.css';


import EditPost from './pages/posts/Edit';
import IndexPost from './pages/posts/Index';
import NewPost from './pages/posts/New';
import ShowPost from './pages/posts/Show';
import EditComment from './pages/comments/Edit';

import Register from './pages/users/Register';
import Login from './pages/users/Login';

import Navbar from './components/Navbar';

import axios from './api'
import { addUser } from './redux/userSlice';

function App() {

  const user = useSelector((state) => state.user)


  console.log('this is user', user)


  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true)

  async function getUser() {

    try {
      const response = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      dispatch(addUser(response.data))
    } catch (err) {
      console.log(err, 'this is err')
      localStorage.removeItem("token")
    }
    setIsLoading(false)
  }

  useEffect(() => {

    let token = localStorage.getItem("token")



    if (token) {
      getUser()
    } else {
      setIsLoading(false)
    }

  }, [])




  return (
    <div className="App">
      <Navbar username={user.username} />
      <Routes>
        <Route path='/' element={<Navigate to='/posts' />} />
        <Route path='/posts' element={<IndexPost user={user.username} />} />
        <Route path='/posts/:id' element={<ShowPost user={user.username} />} />

        {user?.username ? <>
          <Route path='/posts/new' element={<NewPost user={user.username} />} />
          <Route path='/posts/:id/edit' element={<EditPost user={user.username} />} />
          <Route path='/comments/:id/edit' element={<EditComment />} />
          {!isLoading && <Route path='*' element={<Navigate to='/posts' />} />}
        </>
          :
          <>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            {!isLoading && <Route path='*' element={<Navigate to='/login' />} />}
          </>
        }
      </Routes>
    </div>
  );
}

export default App;
