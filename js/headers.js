const token = localStorage.getItem('token')

export default {
  'Authorization': token ? `Bearer ${token}` : undefined
}