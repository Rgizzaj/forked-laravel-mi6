import LeftMenu from './LeftMenu';
import Main from './Main';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserContext from './UserContext';

export default function App() {

    const [user, setUser] = useState(null);

    const getUserInformation = async () => {
        const response = await fetch('/api/user');

        if (response.status === 200) {
            // success, user logged-in
            const data = await response.json();
            setUser(data);
        } else {
            // user NOT logged-in
            setUser(false);

            // why false?
            // false is different from null and we can use both of these
            // empty values to show different states of the user:
            //    - null - not acquired yet
            //    - false - acquired but not logged in (not found)
        }


        // with axios
        // try {
        //     // make the AJAX request
        //     const response = await axios.get('/api/user');
        //     // get the (already JSON-parsed) response data
        //     const data = response.data;

        //     setUser(data);
        // } catch (error) {
        //     setUser(false);
        // }
    }

    useEffect(() => {
        getUserInformation();
    }, [])

    return (
        <UserContext.Provider value={ { user, setUser, getUserInformation } }>

            <BrowserRouter>

                <LeftMenu user={ user } />

                <Main user={ user } />

            </BrowserRouter>

        </UserContext.Provider>
    )
}