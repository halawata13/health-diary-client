const apiUrl = (() => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://health.halawata.net/api';

    default:
      return 'http://localhost:3000';
  }
})();

export const environment = {
  apiUrl,
};
