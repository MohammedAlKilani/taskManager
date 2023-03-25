
import api from './useApi.js'
const useRefesh = async () => {

    const ref=await api().api().get("/refersh"  ,{withCredentials: true});
  return ref?.accessToken
}

export default useRefesh