import { fetchBreeds, fetchCatByBreed } from './modules/cat-api';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'slim-select/dist/slimselect.css';

const refs = {
  breedSelect: document.querySelector('select.breed-select'),
  catInfo: document.querySelector('div.cat-info'),
  loader: document.querySelector('p.loader'),
};

refs.breedSelect.classList.add('is-hidden');
refs.catInfo.classList.add('is-hidden');

fetchBreeds()
  .then(breeds => {
    refs.breedSelect.classList.remove('is-hidden');
    refs.loader.classList.add('is-hidden');
    createBreedSelect(breeds);
  })
  .catch(() =>
    Notify.failure('Oops! Something went wrong! Try reloading the page!')
  )
  .finally(() => refs.loader.classList.add('is-hidden'));

function createBreedSelect(breeds) {
  new SlimSelect({
    select: 'select.breed-select',
    data: [
      { placeholder: true, text: 'Select desired breed...' },
      ...breeds.map(breed => ({ text: breed.name, value: breed.id })),
    ],
    events: {
      afterChange: onBreedSelected,
    },
  });
}

function onBreedSelected(options) {
  const value = options[0].value;
  refs.loader.classList.remove('is-hidden');
  refs.catInfo.classList.add('is-hidden');

  fetchCatByBreed(value)
    .then(breeds => {
      const { description, name, temperament } = breeds.breeds[0];
      refs.catInfo.innerHTML = `
    <img
        src="${breeds.url}"
        alt="${name}"
        class="cat-image"
    />
    <div class="cat-description">
        <h2>${name}</h2>
        <p>${description}</p>
        <p class="cat-temperament"><span>Temperament: </span>${temperament}</p>
    </div>
    `;

      refs.catInfo.classList.remove('is-hidden');
    })
    .catch(() =>
      Notify.failure('Oops! Something went wrong! Try reloading the page!')
    )
    .finally(() => refs.loader.classList.add('is-hidden'));
}
