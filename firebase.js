function initFirebase() {
  firebase.initializeApp({
    apiKey: 'AIzaSyCOV_NJGQGWz4WwyCax55xgMhISAe1GgaU',
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
