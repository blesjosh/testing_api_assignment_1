// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');
const fs = require('fs');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;
  
  // Validate input
  if (typeof threshold !== 'number') {
    return res.status(400).json({ error: 'Threshold must be a number' });
  }

  // Read students from data.json
  try {
    const studentsData = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    
    // Filter students above threshold
    const qualifyingStudents = studentsData.filter(student => student.total > threshold);

    // Return formatted response
    res.json({
      count: qualifyingStudents.length,
      students: qualifyingStudents
    });
  } catch (error) {
    res.status(500).json({ error: 'Error reading student data' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


