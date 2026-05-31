const express = require('express');
const cors = require('cors');
const session = require('express-session');

const { connectDB } = require('./config/StudentInfoDbConfig');

const app = express();

// Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({

    origin: 'http://localhost:4200',

    credentials: true
}));

// ✅ ADD SESSION HERE

app.use(session({

    secret: 'captcha_secret_key',

    resave: false,

    saveUninitialized: true,

    cookie: {

        secure: false
    }
}));

//  Connect DB
connectDB();

//  CREATE
const studentRoutes = require('./routes/create-studentRoute');
app.use('/api/students', studentRoutes);

//  READ
const studentListRoutes = require('./routes/student-listRoute');
app.use('/api/students', studentListRoutes);

//  UPDATE
const studentUpdateRoutes = require('./routes/student-updateRoute');
app.use('/api/students', studentUpdateRoutes);

// 🗑 DELETE (ADD THIS)
const studentDeleteRoutes = require('./routes/student-deleteRoute');
app.use('/api/students', studentDeleteRoutes);

// 📥 SUBMIT STUDENT (ADD THIS)
const submitStudentRoutes = require('./routes/submit-studentRoute');
app.use('/api/students', submitStudentRoutes);

// ✅ DASHBOARD (ADD THIS BELOW)
const dashboardRoutes = require('./routes/dashboardRoute');
app.use('/api/dashboard', dashboardRoutes);

// REGISTER
const registerRoutes = require('./routes/registerRoute');
app.use('/api/auth', registerRoutes);

// LOGIN
const loginRoutes = require('./routes/loginRoute');
app.use('/api/auth', loginRoutes);

//Admin
const adminRoutes = require('./routes/adminRoute');
app.use('/admin', adminRoutes);

//captcha
const captchaRoute =require('./routes/captchaRoute');
app.use('/api/captcha', captchaRoute);

// Forgot Password
const forgotPasswordRoute = require('./routes/forgotPasswordRoute');
app.use(
  '/api/forgot-password',
  forgotPasswordRoute
);

//  Test
app.get('/', (req, res) => {
    res.send('🚀 Server running...');
});

//  Start
app.listen(3000, () => {
    console.log('🚀 Server running on port 3000');
});