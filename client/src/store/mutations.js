//是否认证的的函数
export const setIsAuthenticated = (state, data) => {
  state.isAuthenticated = data;
}
//用户状态的改变
export const setUser = (state, data) => {
  state.user = data;
  // console.log(data)
}

//用户个人状态的改变
export const setProfile = (state, data) => {
  state.profile = data;
  // console.log(data)
}

export const setLoading = (state, data) => {
  state.loading = data;
}

export const setProfiles = (state, data) => {
  state.profiles = data;
}
