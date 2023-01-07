const express = require('express');
const app = express();

const cors = require('cors');

// const authRoutes = require('./routes/auth_routes');
const clientRoutes = require('./routes/client_routes');
const serviceRoutes = require('./routes/service_routes');
const attendanceRoutes = require('./routes/attendance_routes');

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || process.env.port || 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
    'https://web-pi-ii.herokuapp.com',
    'http://localhost:3000',
];


app.use(cors({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' +
                        'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        
        return callback(null, true);
    },
    methods: 'GET, PUT, POST, DELETE, PATCH',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// app.use('/api', authRoutes);
app.use('/', clientRoutes);
app.use('/', serviceRoutes);
app.use('/', attendanceRoutes);

app.listen(PORT, () => {
    console.log(`Connecting on port ${PORT}`);
});
