// Refactored Card Class
export default class Card {
    constructor(number, name, baseCard, rhCard, storage) {
        this.number = number;
        this.name = name;
        this.baseCard = baseCard;
        this.rhCard = rhCard;
        this.storage = storage;

    }

    isRHAvailable(){
        return this.rhCard["has-reverse-holo"] !== false;
    }

    isBaseCollected() {
        return this.baseCard["collected"] === true;
    }
    isRHCollected() {
        return this.rhCard["collected"] === true;
    }

    isBinderCard(){
        return this.storage === "Binder"
    }

    isToploaderCard(){
        return this.storage === "Top Loader"
    }

    getImageUrl(collected) {
        if (collected) {
            return `https://pkmncards.com/wp-content/uploads/sv1_en_${this.formatCardNumber()}.jpg`;
        }
        return `https://i.pinimg.com/736x/37/17/24/3717242635eb3336ec720d5454b647c8.jpg`;
    }

    formatCardNumber() {
        if (this.number < 10) return `00${this.number}`;
        if (this.number >= 10 && this.number < 100) return `0${this.number}`;
        return `${this.number}`;
    }
}