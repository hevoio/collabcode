function DynamicDropdown(anchor, id, name, data) {
  this.anchor = document.querySelector(anchor);
  this.data = data;
  this.id = id;
  this.name = name;
  this.buildList();
}

DynamicDropdown.prototype.buildList = function() {
  this.anchor.appendChild(this.getListTemplate());
};

DynamicDropdown.prototype.getListTemplate = function() {
  var dropdown = document.createElement('select');
  dropdown.name = this.name;
  dropdown.id = this.id;

  var self = this;
  this.data.forEach(function(item) {
    dropdown.appendChild(self.getOptionTemplate(item));
  });
  return dropdown;
};

DynamicDropdown.prototype.getOptionTemplate = function(item) {
  var option = document.createElement('option');
  option.value = item.value;
  option.innerHTML = item.name;
  return option;
};

DynamicDropdown.prototype.setActiveOption = function(activeOption) {
  var dropdown = this.anchor.querySelector('select');
  dropdown.value = activeOption;
};

DynamicDropdown.prototype.getSelectedTeam = function() {
  return this.anchor.querySelector('select').value;
};

DynamicDropdown.prototype.getClickListener = function(handler) {
  return this.anchor.querySelector('select').addEventListener('change', function() {
    handler(this.value);
  })
};
