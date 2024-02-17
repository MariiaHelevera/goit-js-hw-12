import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.querySelector('.search-form');
const gallery = document.getElementById('gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

const lightBox = new SimpleLightbox('.gallery-link');

let currentPage = 1;
const perPage = 15;
let totalHits = 0;


let searchParams = {
  key: '42334155-d8ef6d202703fa7fdc7903459',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  q: '',
  page: currentPage,
  per_page: perPage
};

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  loader.style.display = 'block';
  const inputValue = e.target.elements.input.value;
  searchParams.q = inputValue;
  searchParams.page = 1;
  currentPage = 1;
  loadMoreBtn.style.display = 'none';
  try {
    const images = await getPhotoByKeyword();
    totalHits = images.totalHits;
    createGallery(images);
  } catch (error) {
    console.log(error);
  }
  e.target.reset();
});

async function getPhotoByKeyword() {
  const urlParams = new URLSearchParams(searchParams);
  try {
    const response = await axios.get(`https://pixabay.com/api/?${urlParams}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
}

loadMoreBtn.addEventListener('click', async function () {
  loader.style.display = 'block';
  searchParams.page += 1;
  try {
    const images = await getPhotoByKeyword();
    if (images.hits.length > 0) {
      loader.style.display = 'block';
      appendToGallery(images);
      scrollToNextPage();
      currentPage += 1;
      searchParams.page = currentPage;
    } else {
      loadMoreBtn.style.display = 'none';
      iziToast.show({
        message: "We're sorry, but there are no more results to display.",
        messageColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        position: 'topRight',
        messageSize: '16px',
        messageLineHeight: '24px',
        maxWidth: '432px',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching images. Please try again later.',
      position: 'topRight',
      timeout: 5000
    });
    console.error(error);
  } finally {
    loader.style.display = 'none';
  }
});


function createGallery(images) {
  if (images.hits.length === 0) {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: '#FFFFFF',
      backgroundColor: '#EF4040',
      position: 'topRight',
      messageSize: '16px',
      messageLineHeight: '24px',
      maxWidth: '432px',
    });
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
  } else {
    const link = images.hits
      .map(
        image => `<a class="gallery-link" href="${image.largeImageURL}">
        <img class="gallery-image"
        src="${image.webformatURL}"
        alt="${image.tags}"
         </a>
         <div class="image-info">
          <p ><strong>Likes:</strong> <span class="text">${image.likes}</span></p>
          <p ><strong>Views:</strong> <span class="text">${image.views}</span></p>
          <p ><strong>Comments:</strong> <span class="text">${image.comments}</span></p>
          <p ><strong>Downloads:</strong> <span class="text">${image.downloads}</span></p>
          </div>`
      )
      .join('');

    gallery.innerHTML = link;

    if (totalHits <= currentPage * perPage) {
      loadMoreBtn.style.display = 'none';
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        position: 'topRight',
        messageSize: '16px',
        messageLineHeight: '24px',
        maxWidth: '432px',
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }
  }

  lightBox.refresh();
  loader.style.display = 'none';
}

function appendToGallery(images) {
  const link = images.hits
    .map(
      image => `<a class="gallery-link" href="${image.largeImageURL}">
        <img class="gallery-image"
        src="${image.webformatURL}"
        alt="${image.tags}"
         </a>
         <div class="image-info">
          <p ><strong>Likes:</strong> <span class="text">${image.likes}</span></p>
          <p ><strong>Views:</strong> <span class="text">${image.views}</span></p>
          <p ><strong>Comments:</strong> <span class="text">${image.comments}</span></p>
          <p ><strong>Downloads:</strong> <span class="text">${image.downloads}</span></p>
          </div>`
    )
    .join('');
  gallery.innerHTML += link;
  lightBox.refresh();
  loader.style.display = 'none';
}

function scrollToNextPage() {
  const galleryItemHeight = document.querySelector('.gallery-link').getBoundingClientRect().height;

  window.scrollBy({
    top: galleryItemHeight * 3,
    behavior: 'smooth'
  });
}