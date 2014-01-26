//requires jQuery

// Also create a blank passage with the tag 'empty' on it.

var emptyPassageName = tale.lookup('tags', 'empty')[0].title;
var roomPassages = tale.lookup('tags', 'room');

prerender.twineGang = function(div) {
  if (haveTwineGang()) {
    TwineGang.arrive(this.title);
  }
};

postrender.overrideRoomLinks = function(div) {
  var divClone = div.cloneNode(true);
  jQuery(divClone).insertAfter(div);
  jQuery(div).remove();
  div = divClone;

  jQuery(div).find('a.internalLink').each(function(_idx, el) {
    var passageName = el.getAttribute('id');
    var passage = tale.get(passageName);
    var isRoom = checkIsRoom(passage);
    var roomName = getRoomName(passage);
    var $el = jQuery(el);

    $el.on('click', function() {
      if (haveTwineGang()) {
        TwineGang.click(passageName);
      }
      $el.trigger('unity_actions');
    });

    $el.on('unity_actions', function() {
      if (isRoom && haveUnity()) {
        state.display(emptyPassageName);
        Unity.SendMessage('NewRoom', roomName + '|' + passage.title);
      } else {
        state.display(passageName);
      }
    });
  });
};

function haveTwineGang() {
  return typeof TwineGang !== 'undefined' && TwineGang;
}

function haveUnity() {
  return typeof Unity !== 'undefined' && Unity;
}

function checkIsRoom(passage) {
  var isRoom = false;
  passage.tags.forEach(function(tag) {
    if (tag.match(/^room_/)) {
      isRoom = true;
    }
  });
  return isRoom;
}

function getRoomName(passage) {
  var roomName = '';
  passage.tags.forEach(function(tag) {
    if (tag.match(/^room_/)) {
      roomName = tag.replace(/^room_/, '');
    }
  });
  return roomName;
}
