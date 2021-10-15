var basic = document.getElementById('basic');
if (basic) {
    basic.addEventListener('click', () => {
        Toastify({
            text: 'This is a toast',
            duration: 3000,
        }).showToast();
    });
}

var background = document.getElementById('background');
if (background) {
    background.addEventListener('click', () => {
        Toastify({
            text: 'This is a toast',
            duration: 3000,
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
        }).showToast();
    });
}
var close = document.getElementById('close');
if (close) {
    close.addEventListener('click', () => {
        Toastify({
            text: 'Click close button',
            duration: 3000,
            close: true,
            backgroundColor: '#4fbe87',
        }).showToast();
    });
}

var topLeft = document.getElementById('top-left');
if (topLeft) {
    topLeft.addEventListener('click', () => {
        Toastify({
            text: 'This is toast in top left',
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'left',
            backgroundColor: '#4fbe87',
        }).showToast();
    });
}

var topCenter = document.getElementById('top-center');
if (topCenter) {
    topCenter.addEventListener('click', () => {
        Toastify({
            text: 'This is toast in top center',
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'center',
            backgroundColor: '#4fbe87',
        }).showToast();
    });
}

var topRight = document.getElementById('top-right');
if (topRight) {
    topRight.addEventListener('click', () => {
        Toastify({
            text: 'This is toast in top right',
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'right',
            backgroundColor: '#4fbe87',
        }).showToast();
    });
}

var bottomRight = document.getElementById('bottom-right');
if (bottomRight) {
    bottomRight.addEventListener('click', () => {
        Toastify({
            text: 'This is toast in bottom right',
            duration: 3000,
            close: true,
            gravity: 'bottom',
            position: 'right',
            backgroundColor: '#4fbe87',
        }).showToast();
    });
}

var bottomCenter = document.getElementById('bottom-center');
if (bottomCenter) {
    bottomCenter.addEventListener('click', () => {
        Toastify({
            text: 'This is toast in bottom center',
            duration: 3000,
            close: true,
            gravity: 'bottom',
            position: 'center',
            backgroundColor: '#4fbe87',
        }).showToast();
    });
}

var bottomLeft = document.getElementById('bottom-left');
if (bottomLeft) {
    bottomLeft.addEventListener('click', () => {
        Toastify({
            text: 'This is toast in bottom left',
            duration: 3000,
            close: true,
            gravity: 'bottom',
            position: 'left',
            backgroundColor: '#4fbe87',
        }).showToast();
    });
}
