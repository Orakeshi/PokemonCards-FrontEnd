import Card from './card.js';

// Refactored Binder Class
export default class Binder {
    constructor(containerSelector, cardData) {
        this.binderContainer = document.querySelector(containerSelector);
        this.cardData = cardData;
        this.pageNumber = 0;
        this.cardEntries = 0;
        this.rowEntries = 0;
        this.currentRow = null;
        this.currentPage = null;
    }

    init() {
        this.binderContainer.innerHTML = '';
        this.createBinderHTML();              // Set up the first page
        this.addCardsToBinder();              // Add cards dynamically
    }

    createBinderHTML() {
        this.pageNumber++;
        this.currentPage = document.createElement('div');
        this.currentPage.classList.add('binder-page');

        const pageTitle = document.createElement('h2');
        pageTitle.classList.add('page-subtitle');
        pageTitle.innerText = `Page ${this.pageNumber}`;
        this.currentPage.appendChild(pageTitle);

        this.currentRow = document.createElement('div');
        this.currentRow.classList.add('row');
        this.currentPage.appendChild(this.currentRow);

        this.binderContainer.appendChild(this.currentPage);
    }

    addCardsToBinder() {
        this.cardData.forEach(cardInfo => {
            const card = new Card(
                cardInfo.number,
                cardInfo.name,
                cardInfo["base-collected"],
                cardInfo["rh-collected"],
                cardInfo["card-storage"],
            );

            if(card.isBinderCard() === true){
                this.createCardEntry(card, card.isBaseCollected());

                if(card.isRHAvailable() === false) return;
                card.name = `${card.name} [RH]`
                this.createCardEntry(card, card.isRHCollected());
            }

        });
    }

    createCardEntry(card, collected) {
        if (this.cardEntries === 3) {
            this.cardEntries = 0;
            this.rowEntries++;

            if (this.rowEntries === 3) {
                this.rowEntries = 0;
                this.createBinderHTML();  // Start a new page after 9 cards
            } else {
                this.currentRow = document.createElement('div');
                this.currentRow.classList.add('row');
                this.currentPage.appendChild(this.currentRow);
            }
        }

        const cardEntry = this.generateCardHTML(card, collected);
        this.currentRow.innerHTML += cardEntry;
        this.cardEntries++;
    }

    generateCardHTML(card, collected = true) {
        const imageUrl = card.getImageUrl(collected);
        return `
            <div class="card-entry">
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
