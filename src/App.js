import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Shop from './views/Shop';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

const App = () => {
  // define state for my application using useState
  // const [<state_variable_name>, <setter function>] = useState(<initial_value>);
  // DO NOT DIRECTLY MUTATE STATE (aka dont directly redefine a state variable)
  // always use the setter (in this case setStudents) to mutate state -> this will cause a rerender
  const [students, setStudents] = useState(['Paul', 'Adrian', 'Ethan', 'Vanessa', 'Shaharima']);

  return (
    <div className="App">
      <Navbar />

      <Routes>
          <Route children path='/' element={<Home students={students} setStudents={setStudents} />} />
          <Route children path='/shop' element={<Shop />} />
      </Routes>
    </div>
  );
}

export default App;
