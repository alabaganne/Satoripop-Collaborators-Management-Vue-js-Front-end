import Errors from "./Errors";
import axios from "axios";

export default class Form {
  constructor(data) {
    this.originalData = data;

    for (let field in data) {
      this[field] = data[field];
    }

    this.errors = new Errors();
  }

  data() {
    let data = {};

    for (let field in this.originalData) {
      data[field] = this[field];
    }

    return data;
  }

  post(url, headerOptions = {}) {
    return this.submit("post", url, headerOptions);
  }

  submit(requestType, url, headerOptions) {
    let parameters =
      requestType === "get" || requestType === "delete"
        ? headerOptions
        : this.data();
    return new Promise((resolve, reject) => {
      axios[requestType](url, parameters, headerOptions)
        .then((response) => {
          resolve(response.data);
        })
        .catch((errors) => {
          this.errors.record(errors.response.data.errors);
          reject(errors.response);
        });
    });
  }
}
