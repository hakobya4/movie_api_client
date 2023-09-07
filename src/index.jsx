import React from 'react'
import { createRoot } from "react-dom";
import MainView from "../components/main-view/main-view";
import { Provider } from 'react-redux'
import "./index.scss";
import Container from 'react-bootstrap/Container';


const App = () => {
  return( 
  <Provider store={store} >
    <MainView />
  </Provider>
)};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);