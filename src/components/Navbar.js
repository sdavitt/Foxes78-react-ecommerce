import { GoogleAuthProvider, signInWithPopup, signOut } from '@firebase/auth';
import { Link } from 'react-router-dom';
import { useAuth, useUser, useSigninCheck } from 'reactfire';
import { DataContext } from '../context/DataProvider';
import { useContext } from 'react';

const Navbar = props => {
    // enable out navbar component to use our auth system
    const auth = useAuth();
    const {setCheckoutSignIn} = useContext(DataContext);

    // the useEffect() hook runs its callback every time the component is rendered or rerendered (*by default*)
    // useEffect(() => { console.log('Navbar component rendered or rerendered!') });

    // use the useUser and useSigninCheck hooks to set up the user and usersignedin states
    const { data: user } = useUser();
    const { signinStatus } = useSigninCheck();

    const signin = async () => {
        let provider = new GoogleAuthProvider();
        let x = await signInWithPopup(auth, provider);
        return x
    }

    const signout = async () => {
        setCheckoutSignIn(false);
        await signOut(auth).then(() => console.log('signed out user'));
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Foxes78 | React</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/shop">Shop</Link>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    {
                        signinStatus === 'loading' ?
                            <li className="nav-item mr-1">
                                <button className="nav-link btn btn-info" >Fetching user information...</button>
                            </li>
                        :
                        user ?
                        <>
                            <li className="nav-item">
                                <span className="nav-link" to="/shop">{user.displayName}</span>
                            </li>
                            <li className="nav-item mr-1">
                                <button className="nav-link btn btn-info" onClick={signout}>Sign-out</button>
                            </li>
                        </>
                        :
                            <li className="nav-item mr-1">
                                <button className="nav-link btn btn-info" onClick={signin}>Sign-in</button>
                            </li>
                    }
                    <li className="nav-item">
                        <Link className="nav-link btn btn-info" to={props.cart.size ? '/cart' : '/shop'}><i className="fa fa-shopping-cart"></i> | {props.cart.size ? `${props.cart.size} | $${props.cart.total}m` : 'Empty'}</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;