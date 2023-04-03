import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// async function getDocsFromCollection() {
//   const docRef = collection(db, "emp");
//   const docSnap = await getDocs(docRef);
//   docSnap.forEach((doc) => {
//     const data = doc.data();
//     console.log(data);
//   });
// }
//getDocsFromCollection();

  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
