import local from './config.local';

const base = {
  basename: '/',

  dataUrls: {
    data: 'http://uofo.github.io/reverse-archaeology-content/data/data.json'
  },

  imageUrlBase: 'http://uofo.github.io/reverse-archaeology-content/'
};

let combined = {};

if (process.env.NODE_ENV === 'production') {
  Object.assign(combined, base);
}
else {
  Object.assign(combined, base, local);
}

export default combined;
