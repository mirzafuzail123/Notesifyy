import './App.css';
import Notes from './components/Notes'
import Login from './components/Login'
import Register from './components/Register'
import NoteState from './context/NoteState';
import ModeState from './context/ModeState';
import AlertState from './context/AlertState';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
<>
<NoteState>
<ModeState>
<AlertState>
<Router>
<Routes>

<Route exact path='/' element={<Notes/>} />
<Route exact path='/login' element={<Login/>} />
<Route exact path='/register' element={<Register/>} />

</Routes>
</Router>

</AlertState>
</ModeState>
</NoteState>

</>
  );
}

export default App;
