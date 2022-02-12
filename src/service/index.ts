import LYRequest from '@/service/main'

const lyRequest = new LYRequest({
  baseURL: `http://127.0.0.1:8888/api/private/v1/`,
  headers: {}
})

const mockRequest = new LYRequest({})

const echarsRequest = new LYRequest({
  baseURL: `/api`
})

export { lyRequest, mockRequest, echarsRequest }
// 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2NDM4NzA3MzksImV4cCI6MTY0Mzk1NzEzOX0.XfMCwVUSV0W9_tgyzD3Ga99XCb9HCKtPwNyourADHGA'
