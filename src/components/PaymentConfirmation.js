import { useEffect, useContext } from "react";
import { useDatabase, useUser } from 'reactfire';
import { set, ref } from '@firebase/database';
import { DataContext } from '../context/DataProvider';

const PaymentConfirmation = props => {
    const db = useDatabase();
    const { data: user } = useUser();

    // access our confirmNumber data context
    const { confirmNumber } = useContext(DataContext);

    // different ways to modify cart from here
    // remove all -> clear the entire cart
    const clearCart = () => {
        // if theres a user, update the user cart
        if (user){
            set(ref(db, `carts/${user.uid}`), {
                total: 0,
                size: 0,
                items: {}
            });
        }

        props.setCart({
            total: 0,
            size: 0,
            items: {}
        })
    };

    useEffect(() => {clearCart()}, []);
    
    return (
        <div className="container">
            <h1>Thanks for your payment!</h1>
            <h3>Your confirmation number is: {confirmNumber}</h3>
        </div>
    )
}

export default PaymentConfirmation