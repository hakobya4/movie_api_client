import { createRoot } from "react-dom";
import MainView from "../components/main-view/main-view";
import "./index.scss";
import {Container} from 'react-bootstrap';

const App = () => {
  return( 
  <Container >
    <MainView />
  </Container>
)};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);