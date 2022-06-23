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
        case 'e':
            keys.e.pressed = true;
            break;
        case 'p':
            keys.p.pressed = true;
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
        case 'e':
            keys.e.pressed = false
            break
        case 'p':
            keys.p.pressed = false
            break
  }
})