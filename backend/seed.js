const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('./models/Employee');

dotenv.config();

const sampleEmployees = [
  {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    department: 'Engineering',
    designation: 'Senior Full Stack Developer',
    joiningDate: new Date('2022-03-15'),
    status: 'Active',
  },
  {
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '+91 98234 56789',
    department: 'Human Resources',
    designation: 'HR Manager',
    joiningDate: new Date('2021-07-01'),
    status: 'Active',
  },
  {
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phone: '+91 98111 22334',
    department: 'Engineering',
    designation: 'Frontend Engineer',
    joiningDate: new Date('2023-01-10'),
    status: 'Active',
  },
  {
    name: 'Sneha Verma',
    email: 'sneha.verma@example.com',
    phone: '+91 99887 76655',
    department: 'Marketing',
    designation: 'Digital Marketing Lead',
    joiningDate: new Date('2023-06-20'),
    status: 'Active',
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '+91 97654 32109',
    department: 'Sales',
    designation: 'Business Development Manager',
    joiningDate: new Date('2022-11-05'),
    status: 'Active',
  },
  {
    name: 'Ananya Desai',
    email: 'ananya.desai@example.com',
    phone: '+91 91234 56780',
    department: 'Design',
    designation: 'UI/UX Designer',
    joiningDate: new Date('2023-09-12'),
    status: 'Active',
  },
  {
    name: 'Kabir Kapoor',
    email: 'kabir.kapoor@example.com',
    phone: '+91 98989 89898',
    department: 'Finance',
    designation: 'Financial Analyst',
    joiningDate: new Date('2020-04-18'),
    status: 'Inactive',
  },
  {
    name: 'Isha Nair',
    email: 'isha.nair@example.com',
    phone: '+91 95432 10987',
    department: 'Engineering',
    designation: 'DevOps Engineer',
    joiningDate: new Date('2024-02-01'),
    status: 'Active',
  },
];

const seedData = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/employee_management');
    console.log(`Connected to MongoDB: ${conn.connection.host}`);

    // Clear existing data
    await Employee.deleteMany();
    console.log('Cleared existing employees');

    // Insert sample employees
    await Employee.insertMany(sampleEmployees);
    console.log(`Successfully seeded ${sampleEmployees.length} employees!`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
