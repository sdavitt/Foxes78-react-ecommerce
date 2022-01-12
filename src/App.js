import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Shop from './views/Shop';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Cart from './views/Cart';

const App = () => {
  // define state for my application using useState
  // const [<state_variable_name>, <setter function>] = useState(<initial_value>);
  // DO NOT DIRECTLY MUTATE STATE (aka dont directly redefine a state variable)
  // always use the setter (in this case setStudents) to mutate state -> this will cause a rerender
  const [students, setStudents] = useState(['Paul', 'Adrian', 'Ethan', 'Vanessa', 'Shaharima']);

  // cart state hook -> creation of our initial cart
  const [cart, setCart] = useState({
    total: 0,
    size: 0,
    items: {}
  });

  return (
    <div className="App">
      <Navbar cart={cart} />

      <Routes>
          <Route children path='/' element={<Home students={students} setStudents={setStudents} />} />
          <Route children path='/shop' element={<Shop cart={cart} setCart={setCart} />} />
          <Route children path='/cart' element={<Cart cart={cart} setCart={setCart} />}/>
      </Routes>
    </div>
  );
}

export default App;
