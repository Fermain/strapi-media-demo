const token = localStorage.getItem('token')

export default {
  'Authorization': `Bearer ${token}`
}