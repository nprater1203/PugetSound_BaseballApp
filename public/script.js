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
        dataFile = data // Upload the server response to the data file
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