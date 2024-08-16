// app.js
document.getElementById('speechForm').addEventListener('submit', submitSpeech);

function submitSpeech(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const speech = document.getElementById('speech').value;

    db.collection("speeches").add({
        name: name,
        speech: speech,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    document.getElementById('name').value = '';
    document.getElementById('speech').value = '';
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
    del.addEventListener('click', (event) => {
        let id = event.target.parentElement.getAttribute('data-id');
        db.collection('speeches').doc(id).delete();
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
