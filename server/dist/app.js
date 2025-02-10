"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
if (process.env.NODE_ENV === 'development') {
    const corsOptions = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
    };
    app.use((0, cors_1.default)(corsOptions));
}
else if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    const express = require('express');
    app.use(express.static(path.resolve(__dirname, '../../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
    });
}
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));
app.use('/api/book', bookRoutes_1.default);
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
