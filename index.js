const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 9876;

const WINDOW_SIZE = 10;
const numbersWindow = [];

app.get('/numbers/:type', async(req, res) => {
    const { type } = req.params;

    if (!['p', 'f', 'e', 'r'].includes(type)) {
        return res.status(400).json({ error: 'Invalid number type' });
    }

    try {
        const response = await fetchNumbers(type);

        if (response) {
            const { numbers } = response.data;

            updateNumbersWindow(numbers);

            const avg = calculateAverage();

            res.json({
                windowPrevState: numbersWindow.slice(0, -numbers.length),
                windowCurrState: numbersWindow,
                numbers: numbers,
                avg: avg
            });
        } else {
            res.status(500).json({ error: 'Failed to fetch numbers' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

async function fetchNumbers(type) {
    const url = `https://example.com/api/${type}`;
    try {
        const response = await axios.get(url, { timeout: 500 });
        return response;
    } catch (error) {
        console.error('Error fetching numbers:', error.message);
        return null;
    }
}

function updateNumbersWindow(numbers) {
    numbers.forEach(number => {
        if (!numbersWindow.includes(number)) {
            if (numbersWindow.length >= WINDOW_SIZE) {
                numbersWindow.shift();
            }
            numbersWindow.push(number);
        }
    });
}

function calculateAverage() {
    if (numbersWindow.length === 0) return 0;
    const sum = numbersWindow.reduce((acc, num) => acc + num, 0);
    return (sum / numbersWindow.length).toFixed(2);
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});