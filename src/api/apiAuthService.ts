import axios from 'axios'

const API_URL = 'http://localhost:3016/api'

export async function registerUser(
  name: string,
  email: string,
  password: string,
  profilePicture: File,
) {
  try {
    const formData = new FormData()
    formData.append('Name', name)
    formData.append('Email', email)
    formData.append('Password', password)
    formData.append('Image', profilePicture)

    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    })

    if (!response.data.token) {
      throw Error('Invalid response from API')
    }

    console.log(response.data)

    localStorage.setItem('userToken', response.data.token)
    localStorage.setItem('userName', response.data.name)
    localStorage.setItem('userEmail', response.data.email)
    localStorage.setItem('userPictureId', response.data.profilePictureFile)

    return response.data
  } catch (error) {
    throw error
  }
}
