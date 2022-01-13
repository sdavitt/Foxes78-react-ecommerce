import React, { createContext, useState } from 'react';

export let DataProvider = (props) => {
    const [confirmNumber, setConfirmNumber] = useState('');

    return (
        <DataContext.Provider value={{'confirmNumber': confirmNumber, 'setConfirmNumber': setConfirmNumber}}>
            {props.children}
        </DataContext.Provider>
    )
};

export let DataContext = createContext();

