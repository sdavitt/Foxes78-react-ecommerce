import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import '../css/customCartStyles.css';
import { Navigate } from 'react-router-dom';
import { DataContext } from '../context/DataProvider';



const CheckoutForm = props => {
    // access our stripe setup through hooks
    const stripe = useStripe();
    const elements = useElements();

    // access our confirmNumber data context
    const {setConfirmNumber} = useContext(DataContext);

    /* Steps that we need to happen:
        1. Make a call to our flask app to set up payment intent - we already did this in checkout component
        2. User submits payment info form (if stripe has loaded)
        3. Use that form info alongside the payment intent to confirm and process the payment through stripe
        4. Display the status of our payment (unsubmitted -> processing -> complete/incomplete)
        5. Show confirmation page/clear cart/whatever else you gotta do after payment
    */

    // hooks for control flow/info to display
    const [showPay, setShowPay] = useState(true);
    const [showForm, setShowForm] = useState(true);
    const [errorMessage, seterrorMessage] = useState('');

    //handlePay -> do our api call to stripe and communicate with stripe about payment status on form submission
    const handlePay = async (event) => {
        event.preventDefault(); // stop form submission from reloading the page
        setShowPay(false);
        // make the stripe api calls to confirm our payment
        const data = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        });
        console.log('payment intent received:', data);
        if (data['error']) {
            console.log(data['error']['code']);
            seterrorMessage(data['error']['message']);
            setShowForm('error');
        } else {
            setConfirmNumber(data.paymentIntent.id);
            setShowForm(false);
        }


    }

    // finish our handlePay function and make sure the form and buttons are working as intended (showing cofirmation etc.)
    // fix our API call such that it waits for the user cart to finish loading before sending its request (maybe look at the useEffect hook running on user status change?)

    return (
        <div className="container">
            {
                showForm === true ?
                    <form id="payment-form" onSubmit={handlePay}>
                        <PaymentElement id="payment-element" />
                        <button disabled={!showPay || !stripe || !elements} id="submit" className="btn btn-info mt-3">
                            <span id="button-text">
                                {showPay ? 'Submit Payment' : 'Processing...'}
                            </span>
                        </button>
                    </form>
                    : showForm === 'error' ?
                        <>
                            <h3>There was an error processing your payment. Please try again.</h3>
                            <h3>{errorMessage}</h3>
                        </>
                        :
                        <Navigate to='/confirmation' replace={true}/>
            }
        </div>
    )
}

export default CheckoutForm;