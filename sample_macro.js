//requires jQuery

var emptyPassageName = tale.lookup('tags', 'empty')[0].title;
var roomPassages = tale.lookup('tags', 'room');

postrender.fixRoomLinks = function(div) {
  jQuery(div).find('a.internalLink').each(function(_idx, el) {
    var passageName = el.getAttribute('id');
    var isRoom = false;

    roomPassages.forEach(function(roomPassage) {
      if (roomPassage.title === passageName) {
        isRoom = true;
      }
    });

    if (isRoom) {
      jQuery(el).click(function(e) {
        state.display(emptyPassageName);
        Unity.SendMessage('NewRoom', passageName);
      });
    }
  });
};
