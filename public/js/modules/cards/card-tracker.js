import Binder from 'JS/modules/cards/binder.js'
import Toploader from "JS/modules/cards/toploader.js";

let binderCards = document.getElementsByClassName('card-entry')
let toploaderCards = document.getElementsByClassName('card')

let displayCard = document.getElementById('display-card')

export function prepareBinder(cardData){
    const binder = new Binder('.binder-container', cardData);
    const topLoader = new Toploader('.toploader-container', cardData);

    topLoader.init();
    binder.init();

    // Convert HTMLCollection to an array and then use forEach
    Array.from(binderCards).forEach(card => {
        let image = card.querySelector('img');
        let displayImage = displayCard.querySelector('img');

        image.addEventListener('click', function() {
            displayCard.style.display = 'flex';
            displayImage.src = image.src
        });
    });

    // Convert HTMLCollection to an array and then use forEach
    Array.from(toploaderCards).forEach(card => {
        let image = card.querySelector('img');
        let displayImage = displayCard.querySelector('img');

        image.addEventListener('click', function() {
            displayCard.style.display = 'flex';
            displayImage.src = image.src
        });
    });

    displayCard.addEventListener('click', function() {
        displayCard.style.display = 'none';
    })
}