import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import favoritesUI from "./views/favorites";
import favoritesStore from "./store/favorites";

document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;

  // Events
  initApp();
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
    favoritesUI.init();
    favoritesStore.init();
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }
});



//
// document.querySelector('.tickets-sections').addEventListener('click', (e)=> {
//   e.preventDefault();
//   if(e.target.nodeName === 'A') {
//     const ticketElId = e.target.closest('.ticket-card').dataset.ticketId;
//     const favoritesUI = new FavoritesUI(ticketElId);
//     favoritesUI.addFavoriteToUI();
//   }
// })



// *1 - создать отдельный метод для получения airlines
// *2 - в init добавить получение airlines
// *3 - serializeAirlines
// *4 - serializeTickets и переделать serializeCities и createShortCities и getCityCodeByKey
// *5 - новые методы getAirlineNameByCode, getAirlineLogoByCode, getCityNameByCode
// *6 - TicketsUI


// Получить айди объекта, который добавляется в фейворитс
// метод для добавления этого объекта в лс
// метод для добавления элемента в дропдаун фейворитс
//
