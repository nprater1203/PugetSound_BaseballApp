// Template got from chatGPT


function uploadFileToServer() {
    let dataFile = '';
    // Get the selected file
    const fileInput = document.getElementById('fileID');
    const file = fileInput.files[0];
    console.log(fileInput.files[0]);

    if (!file) {
        alert('Please select a file');
        return;
    }

    // Create a FormData object and append the file to it
    const formData = new FormData();
    formData.append('file', file);
    console.dir(formData)

    // Send the file to the server using fetch
    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => {

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        // Display the output from the server (if needed)
        console.log(data);
        alert('Data sent successfully!');
        const pngFilePath = data.split('/').pop() // Upload the server response to the data file
        
        //console.log('Path to PNG file:', pngFilePath); // Log path to PNG file


        //const pngFilePath = "/c/Users/nprat/OneDrive/Documents/Puget_Sound_Baseball_App/website/public/barplot.png"; // Assuming data contains the path to the PNG file
    
        console.log(pngFilePath)
        // Check if the image exists at the provided path
        checkImage(pngFilePath, function() {
        // If the image exists, display it on the webpage
        document.getElementById('imageContainer').innerHTML = `
            <img src="${pngFilePath}" alt="Your Image" width="500" height="400">
        `;
        }, function() {
            // If the image doesn't exist, display a message
            document.getElementById('imageContainer').innerHTML = '<p>The image is not available.</p>';
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error executing R script. Please check the console for details.');
    });

    //fetchColumnNames();
}

// function fetchColumnNames() {
//     fetch('/getColNames')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Display column names on the webpage
//             //Create a select input menu for the html
//             console.log("Colnames sent back = ", data)
//             const columnNamesDiv = document.getElementById('columnNames');
//             //columnNamesDiv.textContent = data.join(', ');
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Error fetching column names from the server. Please check the console for details.');
//         });
// }

function checkImage(url, onSuccess, onError) {
    var img = new Image();
    img.onload = onSuccess;
    img.onerror = onError;
    img.src = url;
}

// var pngFilePath = './barplot.png';
// checkImage(pngFilePath, function() {
//     document.write('<p>Here is the PNG image:</p>');
//     document.write('<img src="' + pngFilePath + '" alt="Your Image">');
// }, function() {
//     document.write('<p>The image is not available.</p>');
// });