// Ensure the Firebase CDN scripts are included in your HTML

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Firebase
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
    const app = firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore(app);

    document.getElementById('speechForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const speech = document.getElementById('speech').value;

        try {
            await db.collection("speeches").add({
                name: name,
                speech: speech,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            document.getElementById('name').value = '';
            document.getElementById('speech').value = '';
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    });

    function renderSpeech(doc) {
        let li = document.createElement('li');
        let name = document.createElement('span');
        let speech = document.createElement('span');
        let del = document.createElement('button');

        li.setAttribute('data-id', doc.id);
        name.textContent = doc.data().name + ": ";
        speech.textContent = doc.data().speech;
        del.textContent = 'Delete';

        li.appendChild(name);
        li.appendChild(speech);
        li.appendChild(del);

        document.getElementById('speechList').appendChild(li);

        // Deleting data
        del.addEventListener('click', async (event) => {
            let id = event.target.parentElement.getAttribute('data-id');
            try {
                await db.collection('speeches').doc(id).delete();
            } catch (error) {
                console.error("Error removing document: ", error);
            }
        });
    }

    // Real-time listener
    db.collection('speeches').orderBy('timestamp').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added') {
                renderSpeech(change.doc);
            } else if (change.type == 'removed') {
                let li = document.querySelector(`[data-id=${change.doc.id}]`);
                document.getElementById('speechList').removeChild(li);
            }
        });
    });
});
