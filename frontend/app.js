const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/runcode', (req, res) => {
  exec('python D:\\web-database\\algorithm_web\\backend\\demo.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the Python script: ${error}`);
      return res.status(500).send('Internal Server Error');
    }

    try {
      // Attempt to parse the output as JSON
      const jsonData = JSON.parse(stdout);
      res.json(jsonData);
    } catch (parseError) {
      // If parsing fails, send the original output as plain text with line breaks
      console.error(`Error parsing JSON: ${parseError}`);
      res.send(stdout.replace(/\n/g, '<br>'));
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
