// Template to get a file uploaded to the server and use it run the r script got from chatGPT

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const R = require('r-script');

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Parsing the JSON requests
app.use(express.json());

let dataFile = '';
let objectColNames = [];

const rScriptPath = './testServer.R';
const rContent = fs.readFileSync(rScriptPath, 'ascii');

// Makes the page public on the selected server
app.use(express.static('public'));



app.post('/upload', upload.single('file'), (req, res) => {
    // Handle file upload here
    // Process the uploaded file, e.g., save it or perform data analysis
    //console.log("Request = ", req)
    // Get the file buffer
    const fileBuffer = req.file.buffer;
    //console.log("File Buffer = ",fileBuffer);

    // Convert the file buffer to the appropriate data format for R
    dataFile = fileBuffer.toString('ascii'); // Adjust this based on your actual file type and data format

    console.log("Data file: ", dataFile)
      
    console.log("Type of Data File = ", typeof(dataFile))

    const output = R("./testServer.R")
        .data(dataFile)
        .callSync();

    console.log(output);
    // console.log("Size of output = ", Object.keys(output).length)

    // for (const key in output){
    //     objectColNames.push(output[key])
    // }
    // console.log("Object sent back = ", objectColNames)
    //objectColNames = output

    //const report = "This is a sample report."; // Replace with actual report generation code

     res.send(output);
 });

 app.get('/getColNames', (req, res) => {
    // Receive column names from R script and send to the client
    // const colNames = Object.keys(objectColNames);
    // res.json(colNames);
    res.send(objectColNames);
});

// Set up for a local host server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
    
