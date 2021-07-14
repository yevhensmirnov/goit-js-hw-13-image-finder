import 'basiclightbox/dist/basicLightbox.min.css';
import { $render } from './variables.js';
const basicLightbox = require('basiclightbox');
export default
    $render.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.nodeName !== 'IMG') {
            return;
        }
        const instance = basicLightbox.create(`<img src="${e.target.dataset.source}" alt='{{tags}}' />`);
        instance.show();
    });




