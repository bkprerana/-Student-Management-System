const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('StudentInfo', 'sa', 'Prerana@2025', {
  host: 'localhost',
  dialect: 'mssql',
  port: 55441,

  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },

  logging: false
});


// =========================
// ✅ CONNECT DB
// =========================
const connectDB = async () => {

  try {

    await sequelize.authenticate();

    console.log('✅ StudentInfo DB Connected');

    // 🔥 IMPORTANT (sync models)
    await sequelize.sync();

    console.log('✅ Tables synced');

  } catch (error) {

    console.error('❌ DB Error:', error);
  }
};


// =========================
// 🎓 STUDENT MODEL
// =========================
const Student = sequelize.define('Student', {

  RollNumber: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },

  StudentName: DataTypes.STRING,

  Semester: DataTypes.INTEGER,

  Class: DataTypes.STRING,

  Address: DataTypes.STRING,

  JoiningDate: DataTypes.DATEONLY,

  Email: DataTypes.STRING

}, {

  tableName: 'Students',

  timestamps: false
});


// =========================
// 📚 ACADEMIC MODEL
// =========================
const Academic = sequelize.define('Academic', {

  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  RollNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  Subject: DataTypes.STRING,

  Marks: DataTypes.INTEGER,

  Grade: DataTypes.STRING,

  // ✅ ADDED
  Semester: DataTypes.INTEGER

}, {

  tableName: 'Academic',

  timestamps: false
});


// =========================
// 📅 ATTENDANCE MODEL
// =========================
const Attendance = sequelize.define('Attendance', {

  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  RollNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  TotalClasses: DataTypes.INTEGER,

  Present: DataTypes.INTEGER,

  Absent: DataTypes.INTEGER,

  // ✅ ADDED
  Semester: DataTypes.INTEGER

}, {

  tableName: 'Attendance',

  timestamps: false
});


// =========================
// 💰 FEES MODEL
// =========================
const Fees = sequelize.define('Fees', {

  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  RollNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  TotalFees: DataTypes.INTEGER,

  Paid: DataTypes.INTEGER,

  Pending: DataTypes.INTEGER,

  // ✅ ADDED
  Semester: DataTypes.INTEGER

}, {

  tableName: 'Fees',

  timestamps: false
});


// =========================
// 🔔 NOTIFICATIONS MODEL
// =========================
const Notifications = sequelize.define('Notifications', {

  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  RollNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  Message: DataTypes.STRING,

  Date: {
    type: DataTypes.STRING
  },

  // ✅ ADDED
  Semester: DataTypes.INTEGER

}, {

  tableName: 'Notifications',

  timestamps: false
});


// =========================
// 🔗 RELATIONS
// =========================
Student.hasMany(Academic, {
  foreignKey: 'RollNumber'
});

Student.hasMany(Attendance, {
  foreignKey: 'RollNumber'
});

Student.hasMany(Fees, {
  foreignKey: 'RollNumber'
});

Student.hasMany(Notifications, {
  foreignKey: 'RollNumber'
});


// =========================
// 📤 EXPORT
// =========================
module.exports = {

  sequelize,

  connectDB,

  Student,

  Academic,

  Attendance,

  Fees,

  Notifications
};