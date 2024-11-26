import cardData from 'Json/cards/scarlet-violet/sv-base-set.json'; // Import JSON file
import * as BinderPage from 'JS/modules/cards/card-tracker.js'

document.addEventListener('DOMContentLoaded', () => {
    BinderPage.prepareBinder(cardData);
})