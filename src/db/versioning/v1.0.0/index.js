import createProducts from './scripts/createProducts';

// eslint-disable-next-line import/prefer-default-export
export default ({
  major: 1,
  minor: 0,
  build: 0,
  scripts: [
    {
      name: 'createProducts',
      script: createProducts,
    },
  ],
});
