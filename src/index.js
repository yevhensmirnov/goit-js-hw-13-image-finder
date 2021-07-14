import './sass/main.scss';
import { $render, $input, $button } from './js/variables.js';
import apiService from './js/apiService.js';
import card from './templation/cardTemplation.hbs';
import '../node_modules/material-design-icons/iconfont/material-icons.css';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import { defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import { alert } from '@pnotify/core';
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import modal from './js/modal.js';

defaultModules.set(PNotifyMobile, {});
var debounce = require('lodash.debounce');

const fetchImage = new apiService();

function renderCard(currencies) {
    $render.insertAdjacentHTML('beforeend', card(currencies));
    $button.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function clearCard() {
    $render.innerHTML = '';
}

function addImage(e) {
    e.preventDefault();
    clearCard();
    fetchImage.search = e.target.value;
    if (fetchImage.search === '') {
        clearCard();
        alert({
            text: 'Введите слово для поиска',
            width: '400px',
            animateSpeed: 'fast',
            delay: 2000,
            modules: new Map([
                [
                    Confirm,
                    {
                        confirm: true,
                        buttons: [
                            {
                                text: "Ok",
                                primary: true,
                                click: notice => {
                                    notice.close();
                                }
                            }
                        ]
                    }
                ]
            ])
        });
    } else {
        fetchImage.getImage().then(renderCard).catch(error);
    }
    fetchImage.restartValue();

}

function newImage() {
    fetchImage.getImage().then(renderCard);
}

function error() {
    alert('Извините!');
}

$input.addEventListener('input', debounce(addImage,1000));
$button.addEventListener('click', newImage);