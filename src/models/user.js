import axios from 'axios';

export default {
  login,
}

async function login(email, password) {
  const res = await axios.post('/', {
    email,
    password,
  })
  const rawUser = res.data
  console.log("RAWUSER", rawUser)
  const user = {
    role: rawUser.name,
    username: rawUser.username,
    avatar: rawUser.avatar
  }
  return user
}