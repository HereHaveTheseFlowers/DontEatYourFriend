import { Game } from './globals.js';
import store from '../utils/Store.js';

export default class Dialogue {
    constructor({lines}) {
        this.lines = lines;
        this.current_sentence = 0;
    }
    start() {
        Game.state = "dialogue";
        Game.active_dialogue = this;
        this.current_sentence = 0;
        document.getElementById("enter").style.display = "block";
        this.next_line();
    }
    next_line() {
        if(this.current_sentence >= this.lines.length) {
            this.end();
            Game.chat.setText('');
            return;
        }
        if(this.lines[this.current_sentence].author !== "none") {
            const speaker = store.getState()[this.lines[this.current_sentence].author];
            speaker.speak(this.lines[this.current_sentence].text);
        } else {
            Game.chat.setText(this.lines[this.current_sentence].text);
        }
        this.current_sentence++;
    }
    end() {
        Game.state = "normal";
        Game.active_dialogue = false;
        document.getElementById("enter").style.display = "none"
    }
}

export const dialogueGameIntro = [
    { author: "player", text: "I am a mouse!" },
    { author: "player", text: "hehe" }
];
