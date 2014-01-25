#pragma strict

/* Twine Basic Actions
 *
 * Twine behavior script. Receives messages from the Unity API inside the
 * sugarcaneUnity Twine target. Attach to a singleton game object called
 * `TwineScript` in each scene.
 */

var _nextPassage = '';

// Change scenes
function NewRoom(passageName : String) {
  _nextPassage = passageName;
  passageName = passageName.Replace(' ', '');
  Application.LoadLevel(passageName);
}

function OnLevelWasLoaded(_level) {
  Twine.loadPassage(_nextPassage);
  _nextPassage = '';
}
