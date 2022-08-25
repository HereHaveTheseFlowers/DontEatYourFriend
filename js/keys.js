const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    e: {
        pressed: false
    },
    p: {
        pressed: false
    },
    enter: {
        pressed: false
    }
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
        case 'ArrowDown':   
            keys.s.pressed = true;
            break;
        case 'ArrowLeft':
            keys.a.pressed = true;
            break;
        case 'ArrowRight':
            keys.d.pressed = true;
            break;
        case 'ArrowUp':
            keys.w.pressed = true;
            break;
        case 'W':
            keys.w.pressed = true;
            break;
        case 'A':
            keys.a.pressed = true;
            break;
        case 'S':
            keys.s.pressed = true;
            break;
        case 'D':
            keys.d.pressed = true;
            break;
        case 'ц':
            keys.w.pressed = true;
            break;
        case 'ф':
            keys.a.pressed = true;
            break;
        case 'ы':
            keys.s.pressed = true;
            break;
        case 'в':
            keys.d.pressed = true;
            break;
        case 'e':
            keys.e.pressed = true;
            break;
        case 'p':
            keys.p.pressed = true;
            break;
        case 'E':
            keys.e.pressed = true;
            break;
        case 'P':
            keys.p.pressed = true;
            break;
        case 'у':
            keys.e.pressed = true;
            break;
        case 'з':
            keys.p.pressed = true;
            break;
        case 'Enter':
            keys.enter.pressed = true;
            break;
  }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'ArrowDown':
            keys.s.pressed = false
            break
        case 'ArrowLeft':
            keys.a.pressed = false
            break
        case 'ArrowRight':
            keys.d.pressed = false
            break
        case 'ArrowUp':
            keys.w.pressed = false
            break
        case 'W':
            keys.w.pressed = false
            break
        case 'A':
            keys.a.pressed = false
            break
        case 'S':
            keys.s.pressed = false
            break
        case 'D':
            keys.d.pressed = false
            break
        case 'ц':
            keys.w.pressed = false
            break
        case 'ф':
            keys.a.pressed = false
            break
        case 'ы':
            keys.s.pressed = false
            break
        case 'в':
            keys.d.pressed = false
            break
        case 'e':
            keys.e.pressed = false
            break
        case 'p':
            keys.p.pressed = false
            break
        case 'E':
            keys.e.pressed = false
            break
        case 'P':
            keys.p.pressed = false
            break
        case 'у':
            keys.e.pressed = false
            break
        case 'з':
            keys.p.pressed = false
            break
        case 'Enter':
            keys.enter.pressed = false;
            break;
  }
})