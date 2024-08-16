// app.js
import { db } from './js/firebase-config.js';
import { collection, addDoc, deleteDoc, onSnapshot, orderBy, serverTimestamp, doc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

document.getElementById('speechForm').addEventListener('submit', submitSpeech);

async function submitSpeech(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const speech = document.getElementById('speech').value;

    try {
        await addDoc(collection(db, "speeches"), {
            name: name,
            speech: speech,
            timestamp: serverTimestamp()
        });
        
        document.getElementById('name').value = '';
        document.getElementById('speech').value = '';
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

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
            await deleteDoc(doc(db, 'speeches', id));
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    });
}

// Real-time listener
const speechesCol = collection(db, 'speeches');
onSnapshot(orderBy(speechesCol, 'timestamp'), snapshot => {
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
