import { axiosRequest, axiosOptions } from '@/api/service'
export default {
  namespaced: true,
  state: {
    menu: []
  },
  actions: {

    async getMenu ({ state, dispatch }, info) {
      axiosRequest('/view/menu/getMenuTreeData', {}, axiosOptions('get'))
        .then(res => {
          state.menu = res.data
        })
    }

  }
}
