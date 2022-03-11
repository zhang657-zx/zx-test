import request from '@/utils/request'

export const getList = ({targetName,currentPage, pageSize}) => {
  return request({
    url: '/zbml/queryList',
    method: 'post',
    data: {
      targetName, 
      currentPage, 
      pageSize
    }
  })
}

//获取左侧树数据接口--暂无接口文档
export const getTreeList = () => {
  return request({
    url:'/zbml/queryTreeList',
    method:'post',
  })
}

export const getInfo = (pkid) => {
  return request({
    url: '/zbml/edit',
    method: 'post',
    data: {
      pkid
    }
  })
}

export const addInfo = (data) => {
  return request({
    url: '/zbml/save',
    method: 'post',
    data
  })
}

export const delInfo = () => {
  return request({
    url: '/zbml/del',
  })
}
