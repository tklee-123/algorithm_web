const { MongoClient } = require('mongodb');

// Connect to MongoDB
const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function getData() {
    try {
        await client.connect();
        const database = client.db('new_web');
        const studentsCollection = database.collection('students');
        const positionsCollection = database.collection('positions');
        const promisesCollection = database.collection('promises');

        // Retrieve data from MongoDB collections
        const idGpa = await studentsCollection.find({}, { projection: { _id: 1, gpa: 1 } }).toArray();
        const positionsData = await positionsCollection.find({}, { projection: { _id: 1, capacity: 1, gpa_required: 1 } }).toArray();
        const promisesData = await promisesCollection.find({}, { projection: { student_id: 1, promise1: 1, promise2: 1, promise3: 1 } }).toArray();

        const students = idGpa.map(item1 => {
            const promises = promisesData.find(item2 => item1._id === item2.student_id);
            return [item1._id, item1.gpa, promises.promise1, promises.promise2, promises.promise3];
        });

        const ids = students.map(x => x[0]);
        const mvt = positionsData.map(x => x._id);

        console.log(ids);
        console.log(mvt);

        const promision = {};
        for (let i = 0; i < 3; i++) {
            const pm = {};
            positionsData.forEach(position => {
                students.forEach(student => {
                    if (student[2 + i] === position._id) {
                        if (!pm[position._id]) {
                            pm[position._id] = [];
                        }
                        pm[position._id].push([student[0], student[1]]);
                    }
                });
            });
            const lstPm = Object.entries(pm).map(([k, v]) => [k, v, ...positionsData.find(position => position._id === k).slice(1)]);
            const dctPm = Object.fromEntries(lstPm.map(x => [x[0], x.slice(1)]));
            promision[`NV${i + 1}`] = dctPm;
        }
        console.log(`Vị trí theo nguyện vọng: ${JSON.stringify(promision)}`);

        // Function to filter students based on GPA threshold
        function cut(lst, k) {
            return lst.filter(x => x[1] >= k).map(x => [x[0], x[1]]);
        }

        // Function to delete matched students from the list of IDs
        function deleteIds(ids, lst) {
            return ids.filter(id => lst === null || !lst.includes(id));
        }

        // Function for matching students to positions
        function matching(promision, ids, mvtList) {
            const result = {};
            for (const nv in promision) {
                const dct = promision[nv];
                for (const mvt of mvtList) {
                    const listStudent = dct[mvt];
                    listStudent.sort((a, b) => b[1] - a[1]);
                    listStudent = cut(listStudent, listStudent[2]);
                    if (listStudent.length > listStudent[1]) {
                        listStudent = listStudent.slice(0, listStudent[1]);
                    }
                    const msvs = listStudent.map(x => x[0]);
                    for (const msv of msvs) {
                        if (ids.includes(msv)) {
                            if (!result[mvt]) {
                                result[mvt] = [];
                            }
                            result[mvt].push(msv);
                            ids = deleteIds(ids, msv);
                        }
                    }
                }
            }
            return result;
        }

        const matchStd = matching(promision, ids, mvt);

        console.log('Kết quả matching:');
        console.log(matchStd);

        // Write the result to a file or perform further actions as needed
    } finally {
        await client.close();
    }
}

getData();
