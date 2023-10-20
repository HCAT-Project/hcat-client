import useAxiosApi from '~/composables/useAxios'

export function checkFileAPi() {
  return useAxiosApi('/file/check', {
    method: 'POST',
  })
}

export function uploadFileApi() {
  return useAxiosApi('/file/upload', {
    method: 'POST',
  })
}
