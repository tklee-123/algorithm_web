const mongoose = require('mongoose');
const Students = require('../models/Student');
const Positions = require('../models/Position');
const Promises = require('../models/Promise');
const Accounts = require('../models/Account');
async function run() {
    // Create students
    const students = [];
    for (let i = 0; i < 80; i++) {
        const student_id = i <= 9 ? `2100210${i}` : `210021${i}`;
        const student = {
            "_id": student_id,
            "firstname": "ST",
            "lastname": i.toString(),
            "address": `AD${i}`,
            "major": "Data Science",
            "gpa": (Math.random() * (3.8 - 2.3) + 2.3).toFixed(1)
        };
        students.push(student);
    }

    // Create positions
    const positions = [];
    for (let i = 0; i < 40; i++) {
        const position = {
            "_id": `VT${i}`,
            "name": `BA${i}`,
            "capacity": Math.floor(Math.random() * (7 - 3 + 1) + 3),
            "gpa_required": (Math.random() * (3.2 - 2.4) + 2.4).toFixed(1)
        };
        positions.push(position);
    }

    // Insert students and positions
    await Students.insertMany(students);
    await Positions.insertMany(positions);

    // Use created students and positions to create promises
    for (let i = 0; i < 80; i++) {
        const positionIndices = getRandomElements(40, 3);
        const promise = {
            "_id": students[i]._id, // Use the custom _id
            "promised_positions": [
                {"_id": positions[positionIndices[0]]._id }, // Use the custom _id
                {"_id": positions[positionIndices[1]]._id }, // Use the custom _id
                {"_id": positions[positionIndices[2]]._id },  // Use the custom _id
            ]
        };
        await Promises.create(promise);
    }

    const accounts = [];
    for (let i = 0; i < 80; i++) {
        const account = {
            "_id": students[i]._id, // Assuming you want to use student_id as the _id for accounts
            "pass": `password${students[i]._id}`,
            "role": 'student'
        };
        accounts.push(account);
    }


    // Insert accounts
    await Accounts.insertMany(accounts);
    mongoose.connection.close();
}

function getRandomElements(max, numElements) {
    if (numElements > max) {
        throw new Error('Number of elements requested is greater than the maximum');
    }

    const indices = Array.from({ length: max }, (_, i) => i);
    const shuffledIndices = indices.sort(() => Math.random() - 0.5);

    return shuffledIndices.slice(0, numElements);
}

run();
