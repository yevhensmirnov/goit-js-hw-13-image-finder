const URL = "https://pixabay.com/api/"
    const KEY = "22481682-2addccf9e408729062e90e5d3";
    const perPage = "12";

export default class ApiServicePixabey {
    constructor() {
        this.searchRequest = '';
        this.page = 1;
    }

    async getApiCards() {
    
    
    try {
        const response = await fetch(`${URL}?image_type=photo&orientation=horizontal&q=${this.searchRequest}&page=${this.page}&per_page=${perPage}&key=${KEY}`);
        const { hits }= await response.json();
        this.incrementPage();
        return hits;
    } catch (e) {
        return console.log(e);
        }
    }
    incrementPage() {
    this.page += 1;
    }
    
    resetPage() {
        this.page = 1;
    }

    get request() {
        return this.searchRequest;
    }

    set request(newRequest) {
        this.searchRequest = newRequest;
    }
}
