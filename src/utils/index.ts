// 寻找最底层的树菜单id
import { IRightsType } from '@/store/type'

export function treeToPermissions(treeList: IRightsType[]) {
  const permissions: number[] = []

  const _resourceTreeWithId = (treeList: any[], permissions: number[]) => {
    for (const item of treeList) {
      if (item.children && item.children.length > 0) {
        _resourceTreeWithId(item.children, permissions)
      } else {
        permissions!.push(item.id)
      }
    }
  }
  _resourceTreeWithId(treeList, permissions)
  return permissions
}
