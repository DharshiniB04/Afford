// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [response, setResponse] = useState(null);

    const fetchNumbers = async (type) => {
        try {
            const res = await axios.get(`http://localhost:9876/numbers/${type}`);
            setResponse(res.data);
        } catch (error) {
            console.error('Error fetching numbers:', error.message);
        }
    };

    return (
        <div>
            <h1>Average Calculator</h1>
            <button onClick={() => fetchNumbers('e')}>Fetch Even Numbers</button>
            <button onClick={() => fetchNumbers('p')}>Fetch Prime Numbers</button>
            <button onClick={() => fetchNumbers('f')}>Fetch Fibonacci Numbers</button>
            <button onClick={() => fetchNumbers('r')}>Fetch Random Numbers</button>

            {response && (
                <div>
                    <h2>Response</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;
