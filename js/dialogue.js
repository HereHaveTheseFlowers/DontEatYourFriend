class Dialogue {
    constructor({lines}) {
        this.lines = lines;
        this.current_sentence = 0;
    }
    start() {
        Game.state = "dialogue";
        Game.active_dialogue = this;
        this.current_sentence = 0;
        this.next_line();
    }
    next_line() {
        if(this.current_sentence >= this.lines.length) {
            this.end();
            chat.setText('');
            return;
        }
        chat.setText(this.lines[this.current_sentence]);
        this.current_sentence = this.current_sentence + 1;
    }
    end() {
        Game.state = "normal";
        Game.active_dialogue = false;
    }
}
