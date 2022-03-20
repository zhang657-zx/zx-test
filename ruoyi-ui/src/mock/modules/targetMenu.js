let data = {
    code: 200,
    message: 'success',
    total: 100,
    'rows|10': [{
      pkid: '@uuid',	
      gxzq: '',	
      jsgs: '',	
      ywms: '',	
      yxbz: '',	
      sjzbid: '',	
      zblx: '',	
      zbmc: '@cname',
      zbbm: '@cname',
      sjzbmc: '',	
      cjry: '@cname',
      cjrymc: '@cname',	
      cjsj: '@date',
      xgry: '@cname',
      xgrymc: '@cname',
      xgsj: '@date',
    }]
  },
  treeData = {
    code: 200,
    message: 'success',
    'rows|10': [{
      'label|1': '@string',
      'pkid|+1': 1,
      children: [{
        'label|1': '@string',
        'pkid|+1': 20,
        children: [{
          'label|1': '@string',
          'pkid|+1': 30,
        }]
      }]
    }]
  },
  saveData = {
    code: 200,
    message: '操作成功'
  },
  editData = {
    code: 200,
    message: '查询信息',
    data: {
      pkid: '@uuid',	
      gxzq: '更新周期',	
      jsgs: '计算公式',	
      ywms: '业务描述',	
      yxbz: '有效标志',	
      sjzbid: '上级指标pkid',	
      zblx: '1',	
      zbmc: '指标名称',
      zbbm: '指标编码',
      sjzbmc: '上级指标名称',	
      cjry: '创建人员',
      cjrymc: '创建人员名称',	
      cjsj: '@date',
      xgry: '修改人员代码',
      xgrymc: '修改人员名称',
      xgsj: '@date',
    }
  };


export default {
  'post|/dev-api/zbml/queryList': data,
  'post|/dev-api/zbml/queryTreeList': treeData,
  'post|/dev-api/zbml/edit':editData,
  'post|/dev-api/zbml/save': saveData
}
