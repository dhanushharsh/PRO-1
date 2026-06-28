const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('DevOps CI/CD Project Working');
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});
