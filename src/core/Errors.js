export default class Errors {
  constructor() {
    this.errors = {};
  }

  record(errors) {
    this.errors = errors;
  }

  has(field) {
    if (this.errors[field]) {
      return true;
    }
    return false;
  }

  get(field) {
    if (this.errors[field]) {
      return this.errors[field][0];
    }
  }

  clear(field) {
    if (field) {
      delete this.errors[field];
      return;
    }
    this.errors = {};
  }

  any() {
    return Object.keys(this.errors).length > 0;
  }
}
