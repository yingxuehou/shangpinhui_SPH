import { v4 as uuidv4 } from 'uuid'

export const getToken = () => {
  const _token = uuidv4()
  localStorage.setItem('uuidToken',_token)
  return _token
}