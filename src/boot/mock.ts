import { makeServer } from '../mock';

export default () => {
  if (process.env.DEV) {
    makeServer();
  }
};
