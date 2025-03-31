import type { ServiceType } from '@/interfaces/ServiceType'
import { getUserData } from '@/services/userService'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL + '/service-type'

export async function getServiceType(id: number): Promise<ServiceType> {
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

export async function getAllServiceTypes(): Promise<ServiceType[]> {
  try {
    const response = await axios.get(`${API_URL}`, {
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
