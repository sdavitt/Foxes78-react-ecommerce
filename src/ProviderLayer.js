import App from './App';
import { useFirebaseApp, AuthProvider, DatabaseProvider } from 'reactfire';
import { getAuth } from 'firebase/auth';
import { getDatabase } from '@firebase/database';
import { DataProvider } from './context/DataProvider';

const ProviderLayer = () => {
    // reactfire setup
    const app = useFirebaseApp();

    // firebase SDK setup
    const auth = getAuth(app);
    const db = getDatabase(app);

    return (
        <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={db}>
                <DataProvider>
                    <App />
                </DataProvider>
            </DatabaseProvider>
        </AuthProvider>
    )
}

export default ProviderLayer;