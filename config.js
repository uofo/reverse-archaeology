import local from './config.local';

const base = {
  basename: '/',

  dataUrls: {
    data: 'https://uofo.github.io/reverse-archaeology-content/data/data.json'
  },

  imageUrlBase: 'https://uofo.github.io/'
};

let combined = {};

if (process.env.NODE_ENV === 'production') {
  Object.assign(combined, base);
}
else {
  Object.assign(combined, base, local);
}

export default combined;
