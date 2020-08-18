var editor;

function initEditor() {
  editor = ace.edit('firepad');
  ace.config.set('themePath', './ace');
  setTheme('ace/hevo');
}

function setMode(mode) {
  editor.getSession().setMode("ace/mode/" + mode);
}

function storeSelectedMode(mode) {
  firepadDataRef.child('language_mode').set(mode);
}

function setTheme(path) {
  editor.setTheme(path);
}

function getStoredMode() {
  var hash = getEditorHash();
  var mode = localStorage.getItem(hash + '_language');

  return mode;
}
