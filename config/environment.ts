const apiUrl = (() => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://api.halawata.net/health';

    default:
      return 'http://localhost:3000';
  }
})();

export const environment = {
  apiUrl,
};
