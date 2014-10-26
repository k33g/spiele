/**
 * Created by k33g_org on 26/10/14.
 */

export default class Controller { //Observable ?

  constructor (req, res) {
    this.request = req;
    this.response = res;
  }

  ok (statusCode, data) {
    this.response.statusCode = statusCode;
    this.response.send(data);
  }

  redirect (url) {
    this.response.statusCode = 301;
    this.response.header("location", url).end();
  }

  ko (statusCode, err) {
    this.response.statusCode = statusCode;
    this.response.send(JSON.stringify(err));
  }

  body() {
    return this.request.body;
  }

  param(parameterName) {
    return this.request.params[parameterName];
  }

}