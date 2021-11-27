import axios from 'axios'
export default axios.create({
  baseURL : 'http://Localhost:8000/',
  headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
});