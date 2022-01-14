import React, { createContext, useState } from 'react';

export let DataProvider = (props) => {
    const [confirmNumber, setConfirmNumber] = useState('');
    const [checkoutSignIn, setCheckoutSignIn] = useState(false);

    return (
        <DataContext.Provider value={{'confirmNumber': confirmNumber, 'setConfirmNumber': setConfirmNumber, 'checkoutSignIn': checkoutSignIn, 'setCheckoutSignIn': setCheckoutSignIn}}>
            {props.children}
        </DataContext.Provider>
    )
};

export let DataContext = createContext();

