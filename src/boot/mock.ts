import { makeServer } from '@mock/index';

export default () => {
  if (process.env.DEV) {
    makeServer();
  }
};
