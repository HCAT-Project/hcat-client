import useAxiosApi from '~/composables/useAxios'

export function sendGroupMsgApi() {
  return useAxiosApi('/chat/send_group_msg', {
    method: 'POST',
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

export function leaveGroupApi() {
  return useAxiosApi('/group/leave', {
    method: 'POST',
  })
}

export function agreeJoinGroupReqApi() {
  return useAxiosApi('/group/agree_join_group_request', {
    method: 'POST',
  })
}

export function getGroupNameApi() {
  return useAxiosApi('/group/get_name', {
    method: 'POST',
  })
}
export function addAdminApi() {
  return useAxiosApi('/group/add_admin', {
    method: 'POST',
  })
}

export function removeAdminApi() {
  return useAxiosApi('/group/remove_admin', {
    method: 'POST',
  })
}
