import './App.css';
import { auth } from './firebase/init';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
 } from "firebase/auth";


function App() {
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
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      console.log(error);
    })
  }


  return (
    <div className="App">
    <button onClick={register}>Register</button>
    <button onClick={login}>Register</button>
    </div>
  );
}

export default App;
