//actions中的执行的其实就是mutations 中执行的方法，acctions中执行有个好处就是可以异步执行
//解释：导出一个setIsAuthenticated函数 里面执行commit操作 还有携带的数据
export const setIsAuthenticated = ({ commit }, data) => {
  //触发mutation中的setIsAuthenticated方法，所以函数名一定要和mutation中一样
  commit("setIsAuthenticated", data);
}

export const setUser = ({ commit }, data) => {
  commit('setUser', data)
}




