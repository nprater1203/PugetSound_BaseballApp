// Template for functions from ChatGPT

const express = require('express');
const multer = require('multer');
const session = require('express-session');
const fs = require('fs');
const R = require('r-script');
const path = require("path")

const app = express();
const port = 3002;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Parsing the JSON requests
app.use(express.json());

let dataFile = '';
let colNames = [];
let dataDF = {};


const rScriptPath = './testServer.R';
const rContent = fs.readFileSync(rScriptPath, 'ascii');

// Makes the page public on the selected server
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));


app.post('/upload', upload.single('file'), (req, res) => {

    // Get the file buffer
    const fileBuffer = req.file.buffer;
    //console.log("File Buffer = ",fileBuffer);

    // Convert the file buffer to the appropriate data format for R
    dataFile = fileBuffer.toString('ascii'); // Adjust this based on your actual file type and data format


    const parsedData = parseCSVData(dataFile);
    dataDF = parsedData;

    colNames = Object.keys(Object.values(parsedData)[0]);
    res.json({ columnNames: colNames });
 });

 app.get('/getColumnNames', (req, res) => {

    res.json({ columnNames: colNames });
});

app.get('/hitters', (req, res) => {
    const hitters = Object.values(dataDF).map(item => item["Hitter"]);
    // console.log("Hitters = ", hitters)
    res.json(hitters);
});

app.get('/getData', (req,res) => {
    const columnName = req.query.columnName;


    // Retrieve the values of the specified column
    const columnData = Object.values(dataDF).map(item => item[columnName]);
    res.json({ columnData: columnData });


});

// app.get('/generatePDF', (req, res) => {
//     const { default: jsPDF } = require("jspdf");

//     // Generate PDF using jsPDF
//     const pdf = new jsPDF();
//     // You can add content to the PDF here if needed

//     // console.log("Checking PDF = ", pdf);

//     // Convert PDF to a buffer
//     const buffer = pdf.output();

//     // Send the PDF buffer as a response
//     res.type('pdf');
//     res.send(buffer);
// });

// Set up for a local host server
app.listen(port, '10.150.3.55', () => { 
    console.log(`Server is running at http://10.150.3.55:${port}`);
});

// Function to parse CSV data into JSON format (replace with your actual parsing logic)
function parseCSVData(csvData) {
    // Example implementation for parsing CSV data into JSON
    // You may need to use a library like 'csv-parser' for more complex CSV parsing
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    // console.log(headers)

    // Remove the /r from the last value in the header list 
    let valueWithR = headers[headers.length - 1]; // 
    valueWithR = valueWithR.slice(0, -1); // Remove the last character (\r)
    headers[headers.length - 1] = valueWithR; 

    const jsonData = {};

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const obj = {};

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = values[j];
        }

        const key = values[0]; // Assuming the first column is the key
        jsonData[key] = obj;

    }

    return jsonData;
}
    
