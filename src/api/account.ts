import useAxiosApi from '~/composables/useAxios'

export function authTokenApi() {
  return useAxiosApi('/account/authenticate_token', {
    method: 'GET',
  })
}

export function loginApi() {
  return useAxiosApi('/account/login', {
    method: 'POST',
  })
}

export function registerApi() {
  return useAxiosApi('/account/register', {
    method: 'POST',
  })
}

export function logoutApi() {
  return useAxiosApi('/account/logout', {
    method: 'POST',
  })
}

export function getTodoListApi() {
  return useAxiosApi('/account/get_todo_list', {
    method: 'POST',
  })
}

export function getAvatarUrlApi() {
  return useAxiosApi('/account/get_avatar_url', {
    method: 'POST',
  })
}

export function getProfileApi() {
  return useAxiosApi('/account/get_profile', {
    method: 'POST',
  })
}

export function updateProfileApi() {
  return useAxiosApi('/account/update_profile', {
    method: 'POST',
  })
}
