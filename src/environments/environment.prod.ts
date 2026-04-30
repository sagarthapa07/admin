export const environment = {
  production: true,

  urlObj: (key: string) => {
    return {
      thumbnail: 'https://prod.com/thumb/',
      full: 'https://prod.com/full/'
    };
  }
};