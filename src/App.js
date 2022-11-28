import React, { useState } from 'react';
import './App.css';
import { auth, db } from './firebase/init';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
 } from "firebase/auth";


function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  function createPost() {
    const post = {
      title: "land a 100k job",
      description: "Finish Frontend Simplified",
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, 'posts'));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id}));
    console.log(posts);
  }


  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);
      if (user) {
        setUser(user);
      }
    })
  }, []);

  function register() {
    createUserWithEmailAndPassword(auth, 'email@email.com', 'password')
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@email.com', 'password')
    .then(({ user }) => {
      setUser(user);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function logout() {
    signOut(auth);
    setUser({});
  }


  return (
    <div className="App">
    <button onClick={register}>Register</button>
    <button onClick={login}>Login</button>
    <button onClick={logout}>Log Out</button>
    {loading ? 'loading...' : user.email}
    <button onClick={createPost}>Create Post</button>
    <button onClick={getAllPosts}>Get All Posts</button>
    </div>
  );
}

export default App;
