import { alert } from '@pnotify/core';

export default class apiService {
    constructor() {
        this.value = '';
        this.page = 1;
    }

    getImage() {
        const key = '22481682-2addccf9e408729062e90e5d3';
        const baseUrl = 'https://pixabay.com/api/';
        const url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this.value}
        &page=${this.page}&per_page=12&key=${key}`;
        return fetch(url)
            .then(response => {
                if (response.ok) { return response.json(); }
            }).then(({ hits }) => {
                if (hits.length === 0) {
                    alert({
                        text: 'Что-то пошло не так',
                        width: '400px',
                        animateSpeed: 'fast',
                        delay: 2000,
                    });
                } else {
                    this.addPage();
                    return hits;
                }
              
            });
    }

    addPage() {
        this.page += 1;
    }

    restartValue() {
        this.page = 1;
    }

    get search() {
        return this.value;
    }

    set search(newValue) {
        this.value = newValue;
    }
}