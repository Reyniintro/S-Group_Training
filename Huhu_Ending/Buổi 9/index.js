const express = require('express');
const rootRoute = require('./src/route/route');
const errorHandler = require('./src/middleware/errorHandler');
const { PORT } = require('./src/config/env.config');

const app = express();

app.use(express.json());
app.use('/api', rootRoute);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});