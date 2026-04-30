export const environment = {
  production: false,

  urlObj: (key: string) => {
    return {
      thumbnail: 'https://dummy.com/thumb/',
      full: 'https://dummy.com/full/'
    };
  }
};