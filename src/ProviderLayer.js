import React from 'react';
import App from './App';
import { useFirebaseApp, AuthProvider, DatabaseProvider } from 'reactfire';
import { getAuth } from 'firebase/auth';
import { getDatabase } from '@firebase/database';

const ProviderLayer = () => {
    // reactfire setup
    const app = useFirebaseApp();

    // firebase SDK setup
    const auth = getAuth(app);
    const db = getDatabase(app);

    return (
        <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={db}>
                <App />
            </DatabaseProvider>
        </AuthProvider>

    )
}

export default ProviderLayer;