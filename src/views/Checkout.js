import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from 'react';
import { useUser } from 'reactfire';


const stripePromise = loadStripe("pk_test_51KHXEYLj67synhSyO0v3vufegQSgV8VT1c6r7snG8iYNXE8xdZJOSCTBbl4WRCdl1CTpPNRVlpuetxS1mXzkEngk00d8kWGEeq");

const Checkout = props => {
    const [clientSecret, setClientSecret] = useState("");
    const { data: user} = useUser();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        console.log(user);
        let udata = 'guest';
        if (user){
            udata = user;
        }
        fetch("http://127.0.0.1:5000/payments/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([props.cart, udata]), // modify the body to have my cart -> and the user?
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
    }, [props.cart]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <>
            { clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm setCart={props.setCart}/>
                </Elements>
            )}
        </>
    )
}

export default Checkout;