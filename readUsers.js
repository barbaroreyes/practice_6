const fs = require('fs');

// Read the existing data
const data = fs.readFileSync('users.json', 'utf8');
const jsonData = JSON.parse(data);


const newData = { name: 'New User', age: 30 };
jsonData.push(newData);

// Write the updated data
fs.writeFileSync('users.json', JSON.stringify(jsonData, null, 2), 'utf8');

