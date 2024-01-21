import React from 'react'
import ReactDOM from 'react-dom/client'
import  { HashRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

const rootDOM = document.getElementById('root');

if(rootDOM){
    ReactDOM.createRoot(rootDOM).render(
        <React.StrictMode>
          <HashRouter>
            <Provider store={store}>
              <App />
            </Provider>
          </HashRouter>
        </React.StrictMode>
    )
}else{
  console.error('Root element with id "root" not found');
}
