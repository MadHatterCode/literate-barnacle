import favoritesUI from "../views/favorites";

class FavoritesStore {
    constructor() {
        this.storageKey = 'aviaTickets'
    }

    addElementToStorage(element) {
        let itemToStore = JSON.stringify(element);
        localStorage.setItem(element.ticketId + 'aviaTickets', itemToStore);
    }

    removeElementFromStorage(element) {
        localStorage.removeItem(element.dataset.ticketId + this.storageKey);
    }

    renderElementsFromStore() {
        if(localStorage.length) {
            Object.keys(localStorage).forEach(key => {
                if(key.indexOf(this.storageKey) !== -1) {
                    let itemToRender = JSON.parse(localStorage.getItem(key))
                    favoritesUI.addFavoriteToUI(itemToRender);
                }
            })
        }
    }


    init() {
        this.renderElementsFromStore();
    }
}

const favoritesStore = new FavoritesStore();
export default favoritesStore;
