import { insertUserData } from '@/services/userService'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

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

    insertUserData(
      response.data.name,
      response.data.email,
      response.data.profilePictureFile,
      response.data.token,
    )

    return response.data
  } catch (error) {
    throw error
  }
}
