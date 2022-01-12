import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ProviderLayer from './ProviderLayer';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire'; // remember to install tslib alongside reactfire

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFRKPLPRmgVhlo-SHqdzihMqvq5ghTHtc",
  authDomain: "foxes78-react.firebaseapp.com",
  databaseURL: "https://foxes78-react-default-rtdb.firebaseio.com",
  projectId: "foxes78-react",
  storageBucket: "foxes78-react.appspot.com",
  messagingSenderId: "863502280102",
  appId: "1:863502280102:web:8ee720a8cad55cd3839b67"
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <ProviderLayer />
      </FirebaseAppProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
