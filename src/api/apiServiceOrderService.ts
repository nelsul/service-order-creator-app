import type { ServiceOrder, ServiceOrderOptions } from '@/interfaces/ServiceOrder'
import { getUserData } from '@/services/userService'
import axios from 'axios'

const API_URL = 'http://localhost:3016/api/service-order'

export async function createServiceOrder(
  title: string,
  description: string,
): Promise<ServiceOrder> {
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

export async function getServiceOrder(id: string): Promise<ServiceOrder> {
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

export async function getAllServiceOrders(): Promise<ServiceOrder[]> {
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

export async function updateServiceOrder(
  id: string,
  title: string | null = null,
  description: string | null = null,
  serviceTypeId: number | null = null,
  options: ServiceOrderOptions | null = null,
): Promise<ServiceOrder> {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      {
        title: title,
        description: description,
        serviceTypeId: serviceTypeId,
        options: options,
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

export async function addServiceOrderImage(id: string, image: File): Promise<ServiceOrder> {
  try {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('image', image)
    const response = await axios.post(`${API_URL}/image`, formData, {
      headers: {
        Authorization: `Bearer ${getUserData().token}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export async function getServiceOrderImage(
  id: string,
  imageId: string,
  width: number = 200,
  height?: number,
) {
  try {
    let url = `${API_URL}/image-base64?Id=${id}&FileName=${imageId}&Widht=${width}`

    if (height) {
      url += `&Height=${height}`
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getUserData().token}`,
        responseType: 'blob',
      },
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export async function removeServiceOrderImage(id: string, imageId: string): Promise<ServiceOrder> {
  try {
    const response = await axios.delete(`${API_URL}/image`, {
      headers: {
        Authorization: `Bearer ${getUserData().token}`,
        'Content-Type': 'application/json',
      },
      data: {
        id: id,
        imageFileName: imageId,
      },
    })

    return response.data
  } catch (error) {
    throw error
  }
}
