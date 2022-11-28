import React, { useState } from 'react';
import './App.css';
import { auth, db } from './firebase/init';
import { collection, addDoc, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
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
      title: "Finish Firebase Section",
      description: "Do Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, 'posts'));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id}));
    console.log(posts);
  }

  async function getPostById() {
      const hardcodedId = 'e8EQA6HvyZtEk69Vg7B0';
      const postRef = doc(db, 'posts', hardcodedId)
      const postSnap = await getDoc(postRef);
      const post = postSnap.data();
      console.log(post);
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
    <button onClick={getPostById}>Get Post By ID</button>
    </div>
  );
}

export default App;
