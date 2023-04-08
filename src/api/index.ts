import useAxiosApi from '~/composables/useAxios'

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

export function sendGroupMsgApi() {
  return useAxiosApi('/chat/send_group_msg', {
    method: 'POST',
  })
}

export function authTokenApi() {
  return useAxiosApi('/account/authenticate_token', {
    method: 'GET',
  })
}

export function getGroupListApi() {
  return useAxiosApi('/group/get_groups', {
    method: 'GET',
  })
}

export function createGroupApi() {
  return useAxiosApi('/group/create_group', {
    method: 'POST',
  })
}

export function getGroupVerificationApi() {
  return useAxiosApi('/group/get_verification_method', {
    method: 'POST',
  })
}

export function joinGroupApi() {
  return useAxiosApi('/group/join_group', {
    method: 'POST',
  })
}

export function getSelfPmsInGroupApi() {
  return useAxiosApi('/group/get_permission', {
    method: 'POST',
  })
}

export function getGroupSettingApi() {
  return useAxiosApi('/group/get_setting', {
    method: 'POST',
  })
}

export function changeGroupSettingApi() {
  return useAxiosApi('/group/change_group_setting', {
    method: 'POST',
  })
}

export function getGroupMembersApi() {
  return useAxiosApi('/group/get_members', {
    method: 'POST',
  })
}
