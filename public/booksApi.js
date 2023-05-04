class BooksApi {
  constructor() {
    this._apiUrl = "http://localhost:5000/api/user/books/";
  }
  async getBooks(id) {
    let url = this._apiUrl;

    if (id) {
      url += encodeURIComponent(id);
    }
    const response = await axios.get(url);
    return response.data.data;
  }

  async postBook(data) {
    try {
      return axios.post(`${this._apiUrl}`, data);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new BooksApi();
