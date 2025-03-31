const API_URL = import.meta.env.VITE_API_URL + '/user'

export function getUserPictureUrl(pictureId: string, width: number = 200, height?: number) {
  let url = `${API_URL}/picture?FileName=${pictureId}&Widht=${width}`

  if (height) {
    url += `&Height=${height}`
  }

  return url
}
