var FirepadUserList = (function() {
  function FirepadUserList(ref, place, userId, displayName) {
    if (!(this instanceof FirepadUserList)) {
      return new FirepadUserList(ref, place, userId, displayName);
    }

    displayName = displayName || this.getStoredUserName();

    if (!displayName) {
      this.askUserName();
    }

    this.ref_ = ref;
    this.userId_ = userId;
    this.place_ = place;
    this.firebaseCallbacks_ = [];

    var self = this;
    this.hasName_ = !!displayName;
    this.displayName_ = displayName || 'Guest ' + Math.floor(Math.random() * 1000);
    this.firebaseOn_(ref.root.child('.info/connected'), 'value', function(s) {
      if (s.val() === true && self.displayName_) {
        var nameRef = ref.child(self.userId_).child('name');
        nameRef.onDisconnect().remove();
        nameRef.set(self.displayName_);
      }
    });

    this.userList_ = this.makeUserList_();
    place.appendChild(this.userList_);

    $('#display_name_modal').on('hidden.bs.modal', function (e) {
      var name = $('#display_name_ip').val();
      console.log(name);
      self.updateSelfName(name);
      self.storeUserName(name);
    });
  }

  FirepadUserList.prototype.getStoredUserName = function() {
    var hash = getEditorHash();
    var name = localStorage.getItem(hash);
    if (name === 'undefined' || name === 'null' || !name) {
      return;
    }

    return name;
  };

  FirepadUserList.prototype.storeUserName = function(name) {
    var hash = getEditorHash();
    localStorage.setItem(hash, name);
  };

  FirepadUserList.prototype.askUserName = function() {
    $('#display_name_modal').modal();
  };

  // This is the primary "constructor" for symmetry with Firepad.
  FirepadUserList.fromDiv = FirepadUserList;

  FirepadUserList.prototype.dispose = function() {
    this.removeFirebaseCallbacks_();
    this.ref_.child(this.userId_).child('name').remove();

    this.place_.removeChild(this.userList_);
  };

  FirepadUserList.prototype.makeUserList_ = function() {
    return elt('div', [
      elt('div', [
        this.makeUserEntriesForOthers_()
      ], {'class': 'firepad-userlist-users' })
    ], {'class': 'firepad-userlist' });
  };

  FirepadUserList.prototype.updateSelfName = function(name) {
    var myUserRef = this.ref_.child(this.userId_);

    var name = name || "Guest " + Math.floor(Math.random() * 1000);
    myUserRef.child('name').onDisconnect().remove();
    myUserRef.child('name').set(name);
    this.displayName_ = name;
  };

  FirepadUserList.prototype.makeUserEntriesForOthers_ = function() {
    var self = this;
    var userList = elt('div', [], { 'class': 'firepad-userlist-users-container' });
    var userId2Element = { };

    function updateChild(userSnapshot, prevChildName) {
      var userId = userSnapshot.key;
      var div = userId2Element[userId];
      if (div) {
        userList.removeChild(div);
        delete userId2Element[userId];
      }
      var name = userSnapshot.child('name').val();
      if (typeof name !== 'string') { name = 'Guest'; }
      name = name.substring(0, 20);

      var color = userSnapshot.child('color').val();
      if (!isValidColor(color)) {
        color = "#ffb"
      }

      var colorDiv = elt('div', [
        elt('img', [], { 'src': 'https://robohash.org/' + name + '.png' })
      ], { 'class': 'firepad-userlist-color-indicator' });
      colorDiv.style.backgroundColor = color;

      var nameDiv = elt('div', name || 'Guest', { 'class': 'firepad-userlist-name' });

      var userDiv = elt('div', [ colorDiv, nameDiv ], {
        'class': 'firepad-userlist-user ' + 'firepad-user-' + userId
      });
      userId2Element[userId] = userDiv;

      var nextElement =  prevChildName ? userId2Element[prevChildName].nextSibling : userList.firstChild;
      userList.insertBefore(userDiv, nextElement);
    }

    this.firebaseOn_(this.ref_, 'child_added', updateChild);
    this.firebaseOn_(this.ref_, 'child_changed', updateChild);
    this.firebaseOn_(this.ref_, 'child_moved', updateChild);
    this.firebaseOn_(this.ref_, 'child_removed', function(removedSnapshot) {
      var userId = removedSnapshot.key;
      var div = userId2Element[userId];
      if (div) {
        userList.removeChild(div);
        delete userId2Element[userId];
      }
    });

    return userList;
  };

  FirepadUserList.prototype.firebaseOn_ = function(ref, eventType, callback, context) {
    this.firebaseCallbacks_.push({ref: ref, eventType: eventType, callback: callback, context: context });
    ref.on(eventType, callback, context);
    return callback;
  };

  FirepadUserList.prototype.firebaseOff_ = function(ref, eventType, callback, context) {
    ref.off(eventType, callback, context);
    for(var i = 0; i < this.firebaseCallbacks_.length; i++) {
      var l = this.firebaseCallbacks_[i];
      if (l.ref === ref && l.eventType === eventType && l.callback === callback && l.context === context) {
        this.firebaseCallbacks_.splice(i, 1);
        break;
      }
    }
  };

  FirepadUserList.prototype.removeFirebaseCallbacks_ = function() {
    for(var i = 0; i < this.firebaseCallbacks_.length; i++) {
      var l = this.firebaseCallbacks_[i];
      l.ref.off(l.eventType, l.callback, l.context);
    }
    this.firebaseCallbacks_ = [];
  };

  /** Assorted helpers */

  function isValidColor(color) {
    return typeof color === 'string' &&
      (color.match(/^#[a-fA-F0-9]{3,6}$/) || color == 'transparent');
  }


  /** DOM helpers */
  function elt(tag, content, attrs) {
    var e = document.createElement(tag);
    if (typeof content === "string") {
      setTextContent(e, content);
    } else if (content) {
      for (var i = 0; i < content.length; ++i) { e.appendChild(content[i]); }
    }
    for(var attr in (attrs || { })) {
      e.setAttribute(attr, attrs[attr]);
    }
    return e;
  }

  function setTextContent(e, str) {
    e.innerHTML = "";
    e.appendChild(document.createTextNode(str));
  }

  function on(emitter, type, f) {
    if (emitter.addEventListener) {
      emitter.addEventListener(type, f, false);
    } else if (emitter.attachEvent) {
      emitter.attachEvent("on" + type, f);
    }
  }

  function off(emitter, type, f) {
    if (emitter.removeEventListener) {
      emitter.removeEventListener(type, f, false);
    } else if (emitter.detachEvent) {
      emitter.detachEvent("on" + type, f);
    }
  }

  function preventDefault(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  }

  function stopPropagation(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  }

  function stopEvent(e) {
    preventDefault(e);
    stopPropagation(e);
  }

  return FirepadUserList;
})();
