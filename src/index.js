import './sass/main.scss';

import getRefs from './js/refs';
import ApiServicePixabey from './js/apiService';
import photoCardMarkup from './templates/card.hbs';

const apiServicePixabey = new ApiServicePixabey()

const refs = getRefs();

refs.btnLoad.addEventListener('click', onLoadMore);

refs.searchForm.addEventListener('submit', sendSearch);

function sendSearch(e) {
    e.preventDefault();
    apiServicePixabey.resetPage();
 const inputData = e.currentTarget;
    apiServicePixabey.request = inputData.elements.query.value;
   if (apiServicePixabey.request === '') {
        return alert('Введите слово для поиска')
    }
    
    apiServicePixabey.getApiCards().then(photo => {
        clearPageOnNewSearch();
        renderPhotoGalery(photo)
    })
    
   
}



function onLoadMore() {
    apiServicePixabey.getApiCards().then(renderPhotoGalery);
    handleButtonClick()
}

function renderPhotoGalery(photoFromApi) {
   refs.cardContainer.insertAdjacentHTML('beforeend', photoCardMarkup(photoFromApi))
}

function clearPageOnNewSearch() {
    refs.cardContainer.innerHTML = '';
}



const element = document.getElementById('.my-element-selector');

function handleButtonClick() {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    })
};