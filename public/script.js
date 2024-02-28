// Template got from chatGPT
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
        const response = await fetch('/generate-report', {
            method: 'POST',
            body: formData,
        });

        const report = await response.text();
        document.getElementById('report').innerHTML = report;
    } catch (error) {
        console.error(error);
    }
});

