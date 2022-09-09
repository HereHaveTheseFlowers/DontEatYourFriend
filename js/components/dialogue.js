import { Game } from './globals.js';

export default class Dialogue {
    constructor({lines}) {
        this.lines = lines;
        this.current_sentence = 0;
    }
    start() {
        Game.state = "dialogue";
        Game.active_dialogue = this;
        this.current_sentence = 0;
        document.getElementById("enter").style.display = "block"
        this.next_line()
    }
    next_line() {
        if(this.current_sentence >= this.lines.length) {
            this.end();
            Game.chat.setText('');
            return;
        }
        Game.chat.setText(this.lines[this.current_sentence]);
        this.current_sentence = this.current_sentence + 1;
    }
    end() {
        Game.state = "normal";
        Game.active_dialogue = false;
        document.getElementById("enter").style.display = "none"
    }
}
