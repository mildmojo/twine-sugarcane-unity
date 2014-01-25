#pragma strict

/* Singleton pattern
 *
 * GameObjects with this script attached won't be loaded more than once in a
 * scene. Handy with `DontDestroyOnLoad()`.
 */

class TwineScript extends MonoBehaviour {
  private var _instance : TwineScript;

  function Awake() {
    if (_instance) {
      DestroyImmediate(gameObject);
    } else {
      DontDestroyOnLoad(gameObject);
      _instance = this;
    }
  }
}
