import TextFlow from './textgen.js';
import { Game } from './globals.js';
import { animate } from './animate.js';
import { audio } from './audio.js';
import Dialogue from './dialogue.js';

export function prepareGameStart() {
    window.addEventListener('load', function() {
        const loadingtextflow = new TextFlow(Game.menuLogo);
        loadingtextflow.setText("Don't Eat Your Friend!", 30)
        Game.menuButtonStart.style.display = 'block';
        Game.transitionDiv.style.opacity = 0;
        Game.menuButtonStart.onclick = GameStart;
    });
}

export function GameStart () {
    Game.menuButtonStart.classList.add('non-clickable');
    Game.transitionDiv.style.opacity = 1;
    setTimeout(() =>  {
        Game.transitionDiv.style.opacity = 0;
        Game.menuDiv.style.display = 'none'
        Game.mainCanvas.style.display = 'block'
        animate();
        setTimeout(() =>  {
            audio.Map.play();
            Game.state = "normal"
            const dialogue_intro = new Dialogue({ lines: ["I am a mouse!", "hehe", "Rina SUCCKKKSSS", "JK i love her"] });
            dialogue_intro.start();
        }, 900);
    }, 900);
}
