import { getUserData } from '@/services/userService'
import axios from 'axios'

const API_URL = 'http://localhost:3016/api/service-order'

export async function createServiceOrder(title: string, description: string) {
  try {
    const response = await axios.post(
      `${API_URL}`,
      {
        title: title,
        description: description,
      },
      {
        headers: {
          Authorization: `Bearer ${getUserData().token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data
  } catch (error) {
    throw error
  }
}

export async function getServiceOrder(id: string) {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${getUserData().token}`,
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export async function updateServiceOrder(
  id: string,
  title: string | null = null,
  description: string | null = null,
) {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      {
        title: title,
        description: description,
      },
      {
        headers: {
          Authorization: `Bearer ${getUserData().token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data
  } catch (error) {
    throw error
  }
}
