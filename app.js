var firepad;
var firepadDataRef;

function initApp() {
  initFirebase();
  initEditor();

  firepadDataRef = getSessionReference();
  firepad = Firepad.fromACE(firepadDataRef, editor);

  FirepadUserList.fromDiv(firepadDataRef.child('users'), document.querySelector('.users-view'), firepad.firebaseAdapter_.userId_);

  syncModeChanges();
  setShareURL();
}

initApp();
