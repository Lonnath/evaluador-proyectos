import axios from 'axios'
export default axios.create({
  baseURL : window.location.href,
  headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
});