import local from './config.local';

const base = {
  basename: '/',

  dataUrls: {
    artifacts: 'http://uofo.github.io/reverse-archaeology-content/data/artifacts.json',
    pages: 'http://uofo.github.io/reverse-archaeology-content/data/pages.json'
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
