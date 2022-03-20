let modelList = {
    code: 200,
    msg: '查询成功',
    total:100,
    'rows|10':[{
        "pkid":"@uuid",
        "mxbm":"@id",
        "mxmc|1":['模型名称1','模型名称2','模型名称3','模型名称4','模型名称5'],
        "mxlx":"",
        "ywy":"",
        "qsdwdm":"",
        "qsdwmc|1":['申请处室1','申请处室2','申请处室3','申请处室4','申请处室5'],
        "gjz":"",
        "sfjsfl":"",
        "syhy":"",
        "sysz":"",
        "zcyjjbj":"",
        "ywms":"",
        "syhysm":"",
        "ydzy":"",
        "mxfjlj":"",
        "mxyxq":"",
        "djhfbz":"",
        "cjsj":"@date",
        "cjry":"@cname",
        "xgsj":"@date",
        "xgry":"@cname",
    }]
},
delModel = {
    code:200,
    msg:'删除成功'
},
zdlx = {
    code:200,
    msg:'查询成功',
    'data|5':{
        zddm:'@id',
        'zdmc|1':['选项1','选项2','选项3','选项4','选项5']
    }
};

export default {
    'get|/dev-api/mxgl/queryList': modelList,
    'post|/dev-api/mxgl/del': delModel,
    'post|/dev-api/mxgl/delTarget': delModel,
    'post|/dev-api/sjq/queryList': zdlx,
    'post|/dev-api/mxgl/save': delModel
}