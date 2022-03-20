import request from '@/utils/request'

export const getModelList = (data) => {
    return request({
        url: '/mxgl/queryList',
        methods:'post',
        data
    })
}
export const delModel = (pkids) => {
    return request({
        url: '/mxgl/del',
        methods:'post',
        data:{pkids}
    })
}

export const delTarget = (pkid) => {
    return request({
        url:'mxgl/delTarget',
        methods:'post',
        data:{pkid}
    })
}

export const getSelects = (zdlx) => {
    return request({
        url:'/sjq/queryList',
        methods:'post',
        data:{zdlx}
    })
}

export const addInfo = (data) => {
    return request({
        url:'mxgl/save',
        methods:'post',
        data
    })
}