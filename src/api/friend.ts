import useAxiosApi from '~/composables/useAxios'

export function addFriendApi() {
  return useAxiosApi('/friend/add_friend', {
    method: 'POST',
  })
}

export function agreeFriendReqApi() {
  return useAxiosApi('/friend/agree_friend_request', {
    method: 'POST',
  })
}

export function getFriendListApi() {
  return useAxiosApi('/friend/get_friend_list', {
    method: 'POST',
  })
}

export function sendFriendMsgApi() {
  return useAxiosApi('/chat/send_friend_msg', {
    method: 'POST',
  })
}

export function deleteFriendApi() {
  return useAxiosApi('/friend/delete_friend', {
    method: 'POST',
  })
}
