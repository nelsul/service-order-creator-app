const API_URL = 'http://localhost:3016/api/user'

export function getUserPictureUrl(pictureId: string, width: number = 200, height?: number) {
  let url = `${API_URL}/picture?FileName=${pictureId}&Widht=${width}`

  if (height) {
    url += `&Height=${height}`
  }

  return url
}
