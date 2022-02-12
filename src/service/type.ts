// 网络请求返回数据类型
export interface IDataType {
  meta: IMeta
  data: any
}
export interface IMeta {
  msg: string
  status: number
}
// 登陆参数接口
export interface ILoginType {
  username: string
  password: string
}
