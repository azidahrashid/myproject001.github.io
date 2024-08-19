// Dummy database (can be replaced with actual database logic)
let speeches = [];

// Function to submit the speech
function submitSpeech() {
    const name = document.getElementById('name').value;
    const text = document.getElementById('text').value;

    if (name && text) {
        // Store the speech
        speeches.push({ name, text });
        // Clear the form
        document.getElementById('speechForm').reset();
        // Update the speech list
        displaySpeeches();
    } else {
        alert('Please fill out both fields.');
    }
}

// Function to display the list of speeches
function displaySpeeches() {
    const speechList = document.getElementById('speechList');
    speechList.innerHTML = ''; // Clear the list before updating

    speeches.forEach(speech => {
        const speechItem = document.createElement('div');
        speechItem.innerHTML = `<strong>${speech.name}:</strong> <p>${speech.text}</p>`;
        speechList.appendChild(speechItem);
    });
}
