// Ensure the Firebase SDK scripts are included before this script

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyBx97x-JufARMMPekWkRGT_6Flfid2DDR8",
    authDomain: "vydamore-ea949.firebaseapp.com",
    projectId: "vydamore-ea949",
    storageBucket: "vydamore-ea949.appspot.com",
    messagingSenderId: "363045889390",
    appId: "1:363045889390:web:ade4517744f380e40f8d7f",
    measurementId: "G-0H8E7EQZ9M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a Firestore instance
const db = firebase.firestore();

// Function to submit the speech
async function submitSpeech() {
    const name = document.getElementById('name').value;
    const text = document.getElementById('text').value;

    if (name && text) {
        // Store the speech in Firestore
        await db.collection('speeches').add({
            name: name,
            text: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        // Clear the form
        document.getElementById('speechForm').reset();
        // Update the speech list
        displaySpeeches();
    } else {
        alert('Please fill out both fields.');
    }
}

// Function to display the list of speeches
async function displaySpeeches() {
    const speechList = document.getElementById('speechList');
    speechList.innerHTML = ''; // Clear the list before updating

    // Get all speeches from Firestore
    const snapshot = await db.collection('speeches').orderBy('timestamp', 'desc').get();
    snapshot.forEach(doc => {
        const speech = doc.data();
        const speechItem = document.createElement('div');
        speechItem.innerHTML = `<strong>${speech.name}:</strong> <p>${speech.text}</p>`;
        speechList.appendChild(speechItem);
    });
}

// Display speeches when the page loads
window.onload = displaySpeeches;


