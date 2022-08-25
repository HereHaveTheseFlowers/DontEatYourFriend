
class TextFlow {
    constructor(el) {
        this.el = el;
        this.update = this.update.bind(this);
        this.textNew = "";
    }
    setText(newText, speed = 10) {
        if(!newText) this.el.textContent = '';
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let nextChar of newText)
            this.queue.push(nextChar);
        this.frame = 0;
        this.output = "";
        this.update();
        this.speed = speed;
        return promise;
    }
    update() {
        let character = this.queue[this.frame];
        this.output += character;
        if(this.frame >= this.queue.length) {
            this.resolve();
        } else {
            this.el.textContent = this.output;
            let timeoutTime = this.speed + Math.floor(Math.random() * (this.speed*2))
            setTimeout(() => {  this.frameRequest = requestAnimationFrame(this.update); }, timeoutTime);
            this.frame++;
        }
    }
}