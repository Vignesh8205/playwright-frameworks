#!/usr/bin/env node

/**
 * Script to generate sample test data files
 * Usage: node scripts/generate-test-data.js
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Simple data generator functions
function generateRandomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateRandomNumber(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomName(type = 'full') {
  const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Lisa', 'Chris', 'Emma'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  switch (type) {
    case 'first': return firstName;
    case 'last': return lastName;
    default: return `${firstName} ${lastName}`;
  }
}

function writeCSVFile(data, filePath) {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  let csvContent = headers.join(',') + '\n';
  
  data.forEach(row => {
    const values = headers.map(header => row[header] || '');
    csvContent += values.join(',') + '\n';
  });
  
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(filePath, csvContent, 'utf-8');
  console.log(`✅ CSV file created: ${filePath}`);
}

function writeExcelFile(data, filePath, sheetName = 'Sheet1') {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  XLSX.writeFile(workbook, filePath);
  console.log(`✅ Excel file created: ${filePath}`);
}

async function generateTestData() {
  console.log('🚀 Generating sample test data files...\n');
  
  try {
    const outputDir = path.resolve(__dirname, '../test-data');
    
    // Sample credentials data
    const sampleData = [
      {
        username: 'user1@test.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        status: 'active'
      },
      {
        username: 'user2@test.com',
        password: 'password456',
        firstName: 'Jane',
        lastName: 'Smith',
        status: 'active'
      },
      {
        username: 'user3@test.com',
        password: 'password789',
        firstName: 'Bob',
        lastName: 'Johnson',
        status: 'active'
      }
    ];

    // Generate random users
    const testUsers = [];
    for (let i = 0; i < 5; i++) {
      const firstName = generateRandomName('first');
      const lastName = generateRandomName('last');
      testUsers.push({
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@slotbooking.test`,
        password: generateRandomString(12),
        firstName,
        lastName,
        phone: `+1${generateRandomNumber(2000000000, 9999999999)}`
      });
    }

    // Generate slot booking data
    const slotTypes = ['Fitness', 'Yoga', 'Swimming', 'Boxing', 'Dance', 'Pilates'];
    const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    const slotData = [];
    
    for (let i = 0; i < 10; i++) {
      slotData.push({
        slotId: `SLOT_${generateRandomString(6).toUpperCase()}`,
        date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: times[Math.floor(Math.random() * times.length)],
        duration: [30, 45, 60, 90][Math.floor(Math.random() * 4)],
        instructor: generateRandomName('full'),
        capacity: generateRandomNumber(5, 20),
        type: slotTypes[Math.floor(Math.random() * slotTypes.length)]
      });
    }

    // Create files
    writeExcelFile(sampleData, path.join(outputDir, 'sample-data.xlsx'), 'TestCredentials');
    writeCSVFile(sampleData, path.join(outputDir, 'sample-data.csv'));
    writeCSVFile(testUsers, path.join(outputDir, 'generated-users.csv'));
    writeCSVFile(slotData, path.join(outputDir, 'slot-bookings.csv'));
    
    console.log('\n✨ Test data generation completed successfully!');
    console.log('\n📋 Files generated:');
    console.log('   📄 sample-data.xlsx - Sample Excel file with test credentials');
    console.log('   📄 sample-data.csv - Sample CSV file with test credentials'); 
    console.log('   📄 generated-users.csv - Random generated user data');
    console.log('   📄 slot-bookings.csv - Random generated slot booking data');
    
    console.log('\n🔧 How to use in tests:');
    console.log('   import { CSVReader, ExcelReader } from "../utils";');
    console.log('   const data = await CSVReader.readTestCredentials("./test-data/sample-data.csv");');
    console.log('   const excelData = await ExcelReader.readTestCredentials("./test-data/sample-data.xlsx");');
    
  } catch (error) {
    console.error('❌ Error generating test data:', error.message);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  generateTestData();
}

module.exports = { generateTestData };