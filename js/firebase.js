function initFirebase() {
  firebase.initializeApp({
    apiKey: 'AIzaSyCmmhValDudkfKl1N9ZKBdrn3HKHN22y2M',
    authDomain: 'karasuno-df7b7.firebaseio.com/',
    databaseURL: 'https://karasuno-df7b7.firebaseio.com/'
  });
}


function getSessionReference() {
  var ref = firebase.database().ref();
  var hash = getEditorHash();

  if (hash) {
    ref = ref.child(hash);
  } else {
    ref = ref.push();
    window.location = window.location + '#' + ref.key;
  }

  return ref;
}

function getEditorHash() {
  return window.location.hash.replace(/#/g, '');
}
