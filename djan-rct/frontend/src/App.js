import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import axios from "axios";
//axios is making api requests from frontend to backend


function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

export default App;
