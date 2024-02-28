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
    // Return the file back to the client side
    //res.send(dataFile);

    //const { dataFile } = req.body;

    // if(dataFile == null)
    // {
    //     console.log("Didn't work here");
    //     return;
    // }
    // if(!dataFile){
    //     console.log("File is NULL")
    // }
    // else{
    //     console.log("File Contents Recieved", dataFile);
    // }
      
    console.log("Type of Data File = ", typeof(dataFile))
    // Combine the R script content with the file content
    //const combinedScript = `${rContent}\n\n# File Content\nfileContent <- read.table(text = "${dataFile}", sep = ",", header = TRUE)\n`;

    //console.log("Echoing Contents of R File = ", combinedScript)
    // Call the R script
    // const output = R("./testServer.R")
    //     .data(dataFile)
    //     .callSync();
    const output = R("./testServer.R")
        .data(dataFile)
        .callSync();
  
  
    
        // Handle errors
    // if (output.error) {
    //     console.error('Error executing R script:', output.error);
    // } else {
    //     console.log('R Script Output:', output.result);
    // }
        //console.log("Returned Output from R = ", output);

    console.log("Returned Output from R = ", output);


    // // Error Handling
    // if (output.error) {
    //     console.error('Error executing R script:', output.error);
    //     res.status(500).send('Internal Server Error');
    // } else {
    //     res.sendStatus(200);
    // }

     const report = "This is a sample report."; // Replace with actual report generation code

     res.send(report);
 });

// Set up for a local host server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
    
