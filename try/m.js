const { MongoClient } = require('mongodb');
const fs = require('fs').promises;

// Connection URI. Replace 'your_connection_string' with your actual MongoDB connection string.
const uri = 'mongodb://0.0.0.0:27017';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function fetchDataAndWriteToFile() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Select the database and collection
    const database = client.db('web'); // Replace 'your_database' with your actual database name
    const collection1 = database.collection('students'); // Replace 'your_collection' with your actual collection name
    const collection2 = database.collection('positions');
    const collection3 = database.collection('promises');
    // Projection to include only id and gpa
    const projection1 = { id: 1, gpa: 1, _id: 0 };
    const projection2 = { id: 1, gpa: 1, capacity: 1, _id: 0 };
    const projection3 = { student_id: 1, promise1: 1, promise2: 1, promise3: 1, _id: 0 };
    // Query the data with projection
    const result1 = await collection1.find({}, { projection1 }).toArray(); // You can add conditions to filter the data
    const result2 = await collection2.find({}, { projection2 }).toArray();
    const result3 = await collection3.find({}, { projection3 }).toArray();
    // Convert the result to a list of tuples
    const resultList1 = result1.map(item => ({ id: item.id, gpa: item.gpa }));
    const resultList2 = result2.map(item => ({ id: item.id, gpa: item.gpa, capacity: item.capacity }));
    const resultList3 = result3.map(item => ({ student_id: item.student_id, promise1: item.promise1, promise2: item.promise2, promise3: item.promise3 }));
    // Write the list to a text file
    const content1 = resultList1.map(item => `${item.id}, ${item.gpa}`).join('\n');
    const content2 = resultList2.map(item => `${item.id}, ${item.gpa}, ${item.capacity}`).join('\n');
    const content3 = resultList3.map(item => `${item.student_id}, ${item.promise1}, ${item.promise2}, ${item.promise3}`).join('\n');
    await fs.writeFile('idAndGpa.txt', content1);
    await fs.writeFile('positions.txt', content2);
    await fs.writeFile('promises.txt', content3);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// Call the fetchDataAndWriteToFile function
fetchDataAndWriteToFile();
