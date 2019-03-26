const balloon = document.getElementById('balloon');
const startSize = balloon.style.fontSize = '100px';
const balloonEmoji = '&#x1F388';
const boomEmoji = '&#x1F4A5';

let observable = rxjs.fromEvent(document, "keydown");
let mappedObservable = observable.pipe(rxjs.operators
    .map(({code}) => code));
let filteredObservable = changeFilter(mappedObservable, gameFilter);
filteredObservable.subscribe(value => changeGame(value));
filteredObservable.subscribe(value => newGame(value));

function changeFilter(obs, callback) {
    return obs.pipe(rxjs.operators
        .filter(callback));
}

function gameFilter(value) {
    return (value === 'ArrowUp' || value === "ArrowDown" || value === "Space");
}

function newGameFilter(value) {
    return value === "Space";
}

function changeGame(value) {
    let currentSize = parseFloat(balloon.style.fontSize);
    switch (value) {
        case 'ArrowUp':
            balloon.style.fontSize = (currentSize * 1.1) + 'px';
            if (currentSize >= parseFloat(startSize) * 1.5)
            {
                balloon.innerHTML = boomEmoji;
            }
            break;
        case 'ArrowDown':
            balloon.style.fontSize = (currentSize / 1.1) + 'px';
            break;
    }
}

function newGame(value) {
    if (value === 'Space') {
        balloon.style.fontSize = startSize;
        balloon.innerHTML = balloonEmoji;
    }
}
