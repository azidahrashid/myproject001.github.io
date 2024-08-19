// Function to submit the speech
function submitSpeech() {
    const name = document.getElementById('name').value.trim();
    const text = document.getElementById('text').value.trim();

    if (name && text) {
        // Store the speech in localStorage
        speeches.push({ name, text });
        localStorage.setItem('speeches', JSON.stringify(speeches));
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
        speechItem.classList.add('speech-item', 'my-3', 'p-3', 'border', 'rounded');
        speechItem.innerHTML = `<strong>${speech.name}:</strong> <p>${speech.text}</p>`;
        speechList.appendChild(speechItem);
    });
}

// Load speeches from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedSpeeches = localStorage.getItem('speeches');
    if (storedSpeeches) {
        speeches = JSON.parse(storedSpeeches);
        displaySpeeches();
    }
});
