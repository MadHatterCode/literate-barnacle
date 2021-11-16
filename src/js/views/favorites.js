import locations from "../store/locations";
import favoritesStore from "../store/favorites";

class FavoritesUI {
    constructor() {
        this.favoritesDropdown = document.querySelector('#dropdown1');
        this.tickectsSection = document.querySelector('.tickets-sections')
    }

    getFavoriteElementById(id) {
        return Object.values(locations.lastSearch).find(el => el.ticketId == id);
    }

    addFavoriteToUI(selectedTicket) {
        const favoriteItem = this.favoritesTemplate(selectedTicket);
        this.favoritesDropdown.insertAdjacentHTML('afterbegin', favoriteItem)
    }


    removeFavoriteFromUI(selectedTicket) {
        selectedTicket.parentElement.removeChild(selectedTicket);
    }


    bindListeners(triggerElements) {
        triggerElements.forEach(element => {
           element.addEventListener('click', (e) => {
               if(e.target.nodeName === 'A' && e.target.closest('.ticket-card')) {
                   let ticketElId = e.target.closest('.ticket-card').dataset.ticketId;
                   let selectedElement = this.getFavoriteElementById(ticketElId);
                   this.addFavoriteToUI(selectedElement);
                   favoritesStore.addElementToStorage(selectedElement)
               } else if(e.target.nodeName === 'A' && e.target.closest('#dropdown1')) {
                   let favoriteElId = e.target.parentElement.parentElement.dataset.ticketId;
                   let selectedElement = document.querySelector(`[data-ticket-id='${favoriteElId}']`)
                   this.removeFavoriteFromUI(selectedElement);
                   favoritesStore.removeElementFromStorage(selectedElement)
               }
           })
        })
    }

    favoritesTemplate({ticketId, origin_name, destination_name, departure_at, price, transfers, flight_number, airline_logo}) {
        return `
              <div class="favorite-item  d-flex align-items-start" data-ticket-id="${ticketId}">
                <img
                  src="${airline_logo}"
                  class="favorite-item-airline-img"
                />
                <div class="favorite-item-info d-flex flex-column">
                  <div
                    class="favorite-item-destination d-flex align-items-center"
                  >
                    <div class="d-flex align-items-center mr-auto">
                      <span class="favorite-item-city">${origin_name} </span>
                      <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="medium material-icons">flight_land</i>
                      <span class="favorite-item-city">${destination_name}</span>
                    </div>
                  </div>
                  <div class="ticket-time-price d-flex align-items-center">
                    <span class="ticket-time-departure">${departure_at}</span>
                    <span class="ticket-price ml-auto">$${price}</span>
                  </div>
                  <div class="ticket-additional-info">
                    <span class="ticket-transfers">Пересадок: ${transfers === 0 ? "Без пересадок" : transfers}</span>
                    <span class="ticket-flight-number">Номер рейса: ${flight_number}</span>
                  </div>
                  <a
                    class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
                    >Delete</a
                  >
                </div>
              </div>
      `
    }

    init() {
        this.bindListeners([this.tickectsSection, this.favoritesDropdown])
    }
}

const favoritesUI = new FavoritesUI();
export default favoritesUI;
