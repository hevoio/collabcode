var languageModeSelect = new DynamicDropdown(
  '#language_mode_anchor',
  'language_mode',
  'language-mode',
  languageModes
);


function handleLanguageModeChange() {
  languageModeSelect.getClickListener(function(value) {
    setMode(value);
    storeSelectedMode(value);
  });
}

function syncModeChanges() {
  firepadDataRef.child('language_mode').on('value', function(s) {
    var mode = s.val() || defaultLanguageMode;
    languageModeSelect.setActiveOption(mode);
    setMode(mode);
  });
}

function setShareURL() {
  document.querySelector('#modal_share_url').innerHTML = window.location.href;
}

handleLanguageModeChange();
