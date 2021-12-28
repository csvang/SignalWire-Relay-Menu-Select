import express from 'express';

const app = express();

app.use(express.static('audio'));

app.listen(4123, () => {
    console.log('[WEB SERVER] - Running on port 4123.');
})