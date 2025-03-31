export function getUserData(): { name: string; email: string; pictureId: string; token: string } {
  if (
    !localStorage.getItem('userName') ||
    !localStorage.getItem('userEmail') ||
    !localStorage.getItem('userPictureId') ||
    !localStorage.getItem('userToken')
  ) {
    removeUserData()

    throw Error('invalid user data')
  }
  return {
    name: localStorage.getItem('userName')!,
    email: localStorage.getItem('userEmail')!,
    pictureId: localStorage.getItem('userPictureId')!,
    token: localStorage.getItem('userToken')!,
  }
}

export function insertUserData(name: string, email: string, pictureId: string, token: string) {
  localStorage.setItem('userName', name)
  localStorage.setItem('userEmail', email)
  localStorage.setItem('userPictureId', pictureId)
  localStorage.setItem('userToken', token)
}

export function removeUserData() {
  localStorage.removeItem('userName')
  localStorage.removeItem('userEmail')
  localStorage.removeItem('userPictureId')
  localStorage.removeItem('userToken')
}
