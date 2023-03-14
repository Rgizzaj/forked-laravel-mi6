import LeftMenu from './LeftMenu';
import Main from './Main';
import './App.scss';
import { useState } from 'react';

export default function App() {
    const [content, setContent] = useState('');

    return (
        <>
            <LeftMenu setContent={setContent} />

            <Main content={content}/>
        </>
    )
}