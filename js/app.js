// Function to submit the speech
function submitSpeech() {
    const name = document.getElementById('name').value.trim();
    const text = document.getElementById('text').value.trim();

    if (name && text) {
        // Add speech to Firestore
        db.collection('speeches').add({
            name: name,
            text: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            // Clear the form
            document.getElementById('speechForm').reset();
        }).catch((error) => {
            console.error("Error adding speech: ", error);
        });
    } else {
        alert('Please fill out both fields.');
    }
}

// Function to display the list of speeches
function displaySpeeches() {
    const speechList = document.getElementById('speechList');
    speechList.innerHTML = ''; // Clear the list before updating

    db.collection('speeches').orderBy('timestamp', 'desc').onSnapshot((querySnapshot) => {
        speechList.innerHTML = ''; // Clear the list before updating
        querySnapshot.forEach((doc) => {
            const speech = doc.data();
            const speechItem = document.createElement('div');
            speechItem.classList.add('speech-item', 'my-3', 'p-3', 'border', 'rounded');
            speechItem.innerHTML = `<strong>${speech.name}:</strong> <p>${speech.text}</p>`;
            speechList.appendChild(speechItem);
        });
    });
}

// Load speeches on page load
document.addEventListener('DOMContentLoaded', displaySpeeches);
