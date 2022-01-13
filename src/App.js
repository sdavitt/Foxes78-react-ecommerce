import './App.css';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Shop from './views/Shop';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDatabase, useUser } from 'reactfire';
import Cart from './views/Cart';
import { get, child, ref } from '@firebase/database';
import Checkout from './views/Checkout';
import PaymentConfirmation from './components/PaymentConfirmation';

const App = () => {
  const db = useDatabase();
  const { data: user } = useUser();

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

  // we have a situational check that we want to do -> if there is a change in user status, (aka a sign-in or a sign-out)
    // we then want to compare the current cart to the database cart (aka if a user signs in, grab their old cart from the db)
    // if a user signs out, do nothing
  // useEffect hook with 2nd parameter [user] aka run the effect when there is change in the user object
  useEffect(() => {
    if (user) { // if there is a user logged in, check the db for a cart belonging to this user, then do some stuff to make the local state cart match that db cart
      // how do we Read our database? so far we've only written to it -> back to documentation!
      get(child(ref(db), `carts/${user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val()); // instead of just console logging the snapshot's value -> let's set the cart state
          let dbcart = snapshot.val();
          // we need to make sure that cart.items exists
          if (!dbcart['items']){
            dbcart['items'] = {};
          }
          setCart(dbcart);
        } else {
          console.log("No data available");
        }
      }
      ).catch((error) => {
        console.error(error);
      })
    }
  }, [user]);
  
  return (
    <div className="App">
      <Navbar cart={cart} />

      <Routes>
          <Route children path='/' element={<Home students={students} setStudents={setStudents} />} />
          <Route children path='/shop' element={<Shop cart={cart} setCart={setCart} />} />
          <Route children path='/cart' element={<Cart cart={cart} setCart={setCart} />}/>
          <Route children path='/checkout' element={<Checkout cart={cart} setCart={setCart}/>}/>
          <Route children path='/confirmation' element={<PaymentConfirmation cart={cart} setCart={setCart}/>}/>
      </Routes>
    </div>
  );
}

export default App;
