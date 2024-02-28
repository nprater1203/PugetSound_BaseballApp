const fs = require('fs');

// Replace 'Fall2023_Hitter_Data.csv' with your actual file name
const filePath = '../PugetSoundBaseball/dataFiles/Fall2023_Hitter_Data.csv';

// Read the file with the specified encoding ('ascii' in this case)
const fileContent = fs.readFileSync(filePath, 'utf-8');

// Now fileContent contains the content of the CSV file as a string
console.log(fileContent);