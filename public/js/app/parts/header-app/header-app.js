import MyTitle from './MyTitle';

export default (options) =>  {
  console.log("--- This is the header ---", options);
  new MyTitle("POC-POT: ECMAScript 6 + MongoDB");
}

