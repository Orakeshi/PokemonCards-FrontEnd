import Card from './card.js';

export default class Toploader {
    constructor(containerSelector, cardData) {
        this.toploaderContainer = document.querySelector(containerSelector);
        this.cardData = cardData;
    }


    init(){
        this.addToploaderCards();
    }

    addToploaderCards() {
        this.cardData.forEach(cardInfo => {
            const card = new Card(
                cardInfo.number,
                cardInfo.name,
                cardInfo["base-card"],
                cardInfo["reverse-holo"],
                cardInfo.storage,
            );

            if(card.isToploaderCard() === true){
                this.createCardEntry(card, card.isBaseCollected());

                if(card.isRHAvailable() === false) return;
                card.name = `${card.name} [RH]`
                this.createCardEntry(card, card.isRHCollected());
            }

        });
    }

    createCardEntry(card, collected){
        const cardEntry = this.generateCardHTML(card, collected);
        this.toploaderContainer.innerHTML += cardEntry;
    }

    generateCardHTML(card, collected = true) {
        const imageUrl = card.getImageUrl(collected);
        return `
            <div class="card">
                <div class="card-image">
                    <img class="zoomable-image" src="${imageUrl}" loading="lazy" alt="${card.name}">
                </div>
                <div class="card-info">
                    <h3 class="card-name">${card.name}</h3>
                    ${card.number ? `<h3 class="card-number">#${card.number}</h3>` : ''}
                </div>
            </div>
        `;
    }
}