/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
class CurrentUser {
  get() {
    const storedJsonString = localStorage.getItem('user');
    return storedJsonString !== null ? JSON.parse(storedJsonString) : null;
  }

  remove() {
    localStorage.removeItem('user');
  }

  set(user) {
    const jsonString = JSON.stringify(user);
    localStorage.setItem('user', jsonString);
  }
}

export default new CurrentUser();
