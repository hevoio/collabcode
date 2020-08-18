function initFirebase() {
  firebase.initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL
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
