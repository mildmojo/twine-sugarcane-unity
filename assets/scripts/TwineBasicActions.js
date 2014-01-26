#pragma strict

/* Twine Basic Actions
 *
 * Twine behavior script. Receives messages from the Unity API inside the
 * sugarcaneUnity Twine target. Attach to a singleton game object called
 * `TwineScript` in each scene.
 */

private var _nextPassage = '';

// Change scenes
function NewRoom(passageName : String) {
  _nextPassage = passageName.Split('|'[0])[1];
  passageName = passageName.Replace(' ', '');
  Application.LoadLevel(passageName);
}

function OnLevelWasLoaded(_level) {
  Twine.loadPassage(_nextPassage);
  _nextPassage = '';
}
