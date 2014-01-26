//requires jQuery

// Also create a blank passage with the tag 'empty' on it.

var emptyPassageName = tale.lookup('tags', 'empty')[0].title;
var roomPassages = tale.lookup('tags', 'room');

prerender.twineGang = function(div) {
  TwineGang.arrive(this.title);
};

postrender.overrideRoomLinks = function(div) {
  var divClone = div.cloneNode(true);
  jQuery(divClone).insertAfter(div);
  jQuery(div).remove();
  div = divClone;

  jQuery(div).find('a.internalLink').each(function(_idx, el) {
    var passageName = el.getAttribute('id');
    var $el = jQuery(el);
    var isRoom = false;

    roomPassages.forEach(function(roomPassage) {
      if (roomPassage.title === passageName) {
        isRoom = true;
      }
    });

    $el.on('click', function() {
      TwineGang.click(passageName);
      $el.trigger('unity_actions');
    });

    $el.on('unity_actions', function() {
      if (isRoom) {
        state.display(emptyPassageName);
        Unity.SendMessage('NewRoom', passageName);
      } else {
        state.display(passageName);
      }
    });
  });
};
