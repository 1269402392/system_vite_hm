export interface IRolesType {
  id: number
  roleName: string
  roleDesc: string
  children: Child[]
}

export interface IRightsType {
  id: number
  authName: string
  path: string
  pid: number
  children: IRightChild[]
}
export interface ICategory {
  cat_id: number
  cat_name: string
  cat_pid: number
  cat_level: number
  cat_deleted: boolean
  children: ICategoryChild1[]
}
export interface ICategoryChild1 {
  cat_id: number
  cat_name: string
  cat_pid: number
  cat_level: number
  cat_deleted: boolean
  children: ICategoryChild2[]
}
export interface ICategoryChild2 {
  cat_id: number
  cat_name: string
  cat_pid: number
  cat_level: number
  cat_deleted: boolean
}

export interface IAddDataType {
  id?: number
  username?: string
  password?: string
  email?: string
  mobile?: string
  cat_name?: string
  cat_pid?: string | number
  cat_level?: string | number
}

export interface IRightChild2 {
  id: number
  authName: string
  path: string
  pid: string
}

export interface IRightChild {
  id: number
  authName: string
  path: string
  pid: number
  children: IRightChild2[]
}

export interface Child3 {
  id: number
  authName: string
  path: string
}

export interface Child2 {
  id: number
  authName: string
  path: string
  children: Child3[]
}

export interface Child {
  id: number
  authName: string
  path: string
  children: Child2[]
}
