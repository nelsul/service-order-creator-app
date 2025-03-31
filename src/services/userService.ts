export function getUserData(): { name: string; email: string; pictureId: string; token: string } {
  if (
    !localStorage.getItem('userName') ||
    !localStorage.getItem('userEmail') ||
    !localStorage.getItem('userPictureId') ||
    !localStorage.getItem('userToken')
  ) {
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userPictureId')
    localStorage.removeItem('userToken')

    throw Error('invalid user data')
  }
  return {
    name: localStorage.getItem('userName')!,
    email: localStorage.getItem('userEmail')!,
    pictureId: localStorage.getItem('userPictureId')!,
    token: localStorage.getItem('userToken')!,
  }
}
