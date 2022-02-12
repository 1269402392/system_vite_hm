import { IMeta } from '@/service/type'

/**
 * 用于顶部弹出消息
 * @param meta -> IMeta
 */
export function showMessage(meta: IMeta) {
  if (meta.status === 200 || meta.status === 201 || meta.status === 204) {
    ;(window as any).$message.success(meta.msg)
  } else {
    ;(window as any).$message.error(meta.msg)
  }
}
