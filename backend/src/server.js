require('express-async-errors');

const { default: helmet } = require('helmet');
const express = require('express');
const cors = require('cors');

const clientRoutes = require('./routes/client_routes');
const workRoutes = require('./routes/work_routes');
const attendanceRoutes = require('./routes/attendance_routes');
const connection = require('./database/connection');

const { PORT } = require('./config/environment');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'https://web-pi-ii.herokuapp.com',
  'http://localhost:3000',
];

const originFn = (origin, callback) => {
  if (!origin) {
    return callback(null, true);
  }

  if (allowedOrigins.indexOf(origin) === -1) {
    const msg = 'The CORS policy for this site does not allow access from the specified origin.';             
    return callback(new Error(msg), false);
  }
      
  return callback(null, true);
};

app.use(cors({
  origin: originFn,
  methods: 'GET, PUT, POST, DELETE, PATCH',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use('/', clientRoutes);
app.use('/', workRoutes);
app.use('/', attendanceRoutes);

connection.then(() => {
  console.log('Connected to database');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});

