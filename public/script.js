//const express = require('express');

// module.exports ={
//     uploadFileToServer,
//     fetchColumnNames,
//     updateBarGraph,
//     updateBarGraph,
//     printGraphs,
//     addGraphToPDF
// }


let pdf;

// Function to upload the file to the server
function uploadFileToServer() {
    fetchPDF();
    let dataFile = '';
    // Get the selected file
    const fileInput = document.getElementById('fileID');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file');
        return;
    }

    // Create a FormData object and append the file to it
    const formData = new FormData();
    formData.append('file', file);

    // Send the file to the server using fetch
    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert('Data sent successfully!');
        fetchColumnNames();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error executing R script. Please check the console for details.');
    });
}

// Function to fetch column names from the server
function fetchColumnNames() {
    fetch('/getColumnNames')
        .then(response => response.json())
        .then(data => {
            // Clear existing options
            const selectElement = document.getElementById('columnSelect');
            selectElement.innerHTML = '';

            // Populate the dropdown selection menu with the received column names
            const columnNames = data.columnNames.slice(2);
            columnNames.forEach(columnName => {
                const option = document.createElement('option');
                option.value = columnName;
                option.textContent = columnName;
                selectElement.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error fetching column names from the server. Please check the console for details.');
        });
}

// Function to update the bar graph based on the selected column
function updateBarGraph() {
    // Fetch data for the selected column from the server
    const selectedColumn = document.getElementById('columnSelect').value;

    // Fetch hitters and data for the selected column from the server
    Promise.all([
        fetch('/hitters').then(response => response.json()),
        fetch(`/getData?columnName=${selectedColumn}`).then(response => response.json())
    ])
    .then(([hittersData, columnData]) => {
        // Extract the hitters and column data
        const hitters = hittersData;
        const columnValues = columnData.columnData;
        const initialStatValues = Object.values(columnValues)
        const selectedStatValues = initialStatValues.map(item => item === null ? 0 : item);

        // console.log('Hitters:', hitters);
        // console.log('Values:', Object.values(columnValues));

        const teamAverage = selectedStatValues.reduce((total, value) => total + value, 0) / selectedStatValues.length;
        // console.log("Team average = ", teamAverage)

        // Create a Plotly bar graph using the extracted data
        const trace = {
            x: hitters,
            y: selectedStatValues,
            type: 'bar',
            transforms: [{
                type: 'sort',
                target: 'y', 
                order: 'descending'
            }]
        };

        const averageLine = {
            x: hitters,
            y: Array(hitters.length).fill(teamAverage), // Fill the array with the average value
            type: 'scatter',
            mode: 'lines',
            line: {
                color: 'red', // Set the color of the line
                dash: 'dash', // Make the line dashed
                width: 2 // Set the width of the line
            },
            name: 'Average' // Set the name of the trace for the legend
        };

        const layout = {
            title: `${selectedColumn} By Player`,
            xaxis: { title: 'Player' },
            yaxis: { title: selectedColumn },
            showlengend : false
        };
        Plotly.newPlot('imageContainer', [trace], layout);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error fetching data for the selected column. Please check the console for details.');
    });
}

function printGraphs() {
    // If no graphs are added to the PDF, return
    if (!pdf || pdf.getNumberOfPages() === 0) {
        alert('No graphs to print.');
        return;
    }

    // Save and print the PDF
    pdf.save('graphs.pdf');
}

function addGraphToPDF() {
    // // Fetch the PDF if not already initialized
    // fetchPDF();


    console.log("Client Side PDF = ", pdf);
    // Add the image to the PDF
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = 500; // Adjust as needed
    canvas.height = 400; // Adjust as needed

    // Make the graph a png and append it to a pdf file
    Plotly.toImage('imageContainer', { format: 'png', height: 400, width: 500 })
        .then(function (url) {
            const img = new Image();
            img.onload = function () {
                context.drawImage(img, 0, 0);
                // Convert canvas to base64 image data
                const imageData = canvas.toDataURL('image/png');

                const scaleFactor = 1;
                const xPos = 10;
                const yPos = 10;
                const width = 180;
                const height = 100;

                // Check if pdf is not initialized, then initialize it
                // if (!pdf) {
                //     pdf = new jsPDF();
                // }
                if (pdf.getNumberOfPages() > 0) {
                    pdf.addPage();
                }

                pdf.addImage(imageData, 'PNG', xPos, yPos, width * scaleFactor, height * scaleFactor);
            };
            img.src = url;
        })
        .catch(function (error) {
            console.error('Error converting plot to image:', error);
        });
}


// Function to fetch the PDF from the server and store it in the pdf variable
function fetchPDF() {
    fetch('/generatePDF')
    .then(response => {
        

        if (response.ok) {
            // If the response is successful, initialize the pdf variable
            return response.blob(); // Get the PDF as ArrayBuffer
        } else {
            throw new Error('Failed to fetch PDF');
        }
    })
    // .then(buffer => {
    //     //const { default: jsPDF } = require("jspdf");
    //     pdf = new jsPDF();
    //     pdf.loadFile(buffer); // Load the PDF from the buffer
    //     console.log('PDF initialized successfully');
    // })'
    .then(blob => {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to fetch PDF. Please check the console for details.');
    });
}

// Function to handle the change event of the dropdown menu
function handleDropdownChange() {
    const selectedColumn = document.getElementById('columnSelect').value;
    updateBarGraph(selectedColumn);
}

// Event listener for the file upload button
document.getElementById('uploadButton').addEventListener('click', uploadFileToServer);

// Event listener for the dropdown menu change event
document.getElementById('columnSelect').addEventListener('change', handleDropdownChange);



// Initial setup: Fetch column names when the page loads
fetchColumnNames();
