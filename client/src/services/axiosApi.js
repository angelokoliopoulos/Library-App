import axios from "axios";

class AxiosAPI {
  constructor() {
    this._apiUrl = "http://localhost:5000";
  }

  async registerUser(userData) {
    try {
      const response = await axios.post(
        `${this._apiUrl}/api/auth/signup`,
        userData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Email already taken"
      ) {
        throw new Error("Email already taken");
      }
      console.error(error);
      throw new Error("Failed to register user");
    }
  }

  async loginUser(userData) {
    try {
      const response = await axios.post(
        `${this._apiUrl}/api/auth/login`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to login user");
    }
  }

  async getBooks(id) {
    let url = `${this._apiUrl}/user/books`;

    if (id) {
      url += `/${encodeURIComponent(id)}`;
    }

    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch books");
    }
  }

  async postBook(bookData) {
    try {
      const response = await axios.post(`${this._apiUrl}/user/books`, bookData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to add book");
    }
  }
}

export default new AxiosAPI();
