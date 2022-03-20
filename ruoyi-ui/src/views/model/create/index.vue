<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form
          class="demo-form-inline"
          ref="searchForm"
          :inline="true"
          :model="searchForm"
          label-width="68px"
        >
          <el-form-item label="模型名称" prop="mxmc">
            <el-input v-model="searchForm.mxmc" size="small"></el-input>
          </el-form-item>
          <el-form-item label="填报人" prop="qsr">
            <el-input v-model="searchForm.qsr" size="small"></el-input>
          </el-form-item>
          <el-form-item label="填报单位" prop="qsdw">
            <el-input v-model="searchForm.qsdw" size="small"></el-input>
          </el-form-item>
          <el-form-item label="申请日期" prop="dateTime">
            <el-date-picker
              v-model="searchForm.dateTime"
              type="daterange"
              align="right"
              size="small"
              value-format="yyyy-MM-dd hh:mm:ss"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              @click="search"
              >查询</el-button
            >
            <el-button size="mini" icon="el-icon-refresh" @click="reset"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button
          plain
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="add"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <!-- 放个样式过来，实际使用的是同一个表格，就是数据不一致 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="待审批" name="first"> </el-tab-pane>
      <el-tab-pane label="已审批" name="second"> </el-tab-pane>
    </el-tabs>
    <el-table :data="tableData.data" stripe style="margin-top: 5px">
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span>{{ tableIndex + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="模型编码"
        prop="mxbm"
        width="200"
      ></el-table-column>
      <el-table-column label="模型名称" prop="mxmc">
        <!-- <template slot-scope="scope">
          <el-link type="primary" @click="see(scope.row.pkid)">{{
            scope.row.mxmc
          }}</el-link>
        </template> -->
      </el-table-column>
      <el-table-column
        label="申请处室"
        prop="qsdwmc"
        width="115"
      ></el-table-column>
      <el-table-column
        label="申请时间"
        prop="cjsj"
        width="150"
      ></el-table-column>
      <el-table-column label="操作" v-if="activeName == 'first'" width="200">
        <template slot-scope="scope">
          <el-button
            plain
            type="success"
            size="mini"
            icon="el-icon-edit"
            @click="search"
            >修改</el-button
          >
          <el-button
            plain
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row.pkid)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="tableData.total > 0"
      :total="!tableData.total ? 0 : tableData.total"
      :page.sync="searchForm.pageNum"
      :limit.sync="searchForm.pageSize"
      @pagination="search"
    />
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="closeDialog"
    >
      <el-form
        ref="dialogForm"
        :model="dialogForm"
        :rules="dialogRules"
        size="medium"
        label-width="100px"
      >
        <span>一、模型信息</span>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="11">
            <el-form-item label="模型名称" prop="mxmc">
              <el-input v-model="dialogForm.mxmc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="模型类型" prop="mxlx">
              <el-input v-model="dialogForm.mxlx"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="业务域" prop="ywy">
              <el-input v-model="dialogForm.ywy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="权属单位" prop="qsdw">
              <el-input v-model="dialogForm.qsdw"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="关键字" prop="gjz">
              <el-input v-model="dialogForm.gjz"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="算法技术分类" prop="sfjsfl">
              <el-input v-model="dialogForm.sfjsfl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="适用行业" prop="syhy">
              <el-input v-model="dialogForm.syhy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="适用税种" prop="sysz">
              <el-input v-model="dialogForm.sysz"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="政策依据以及背景" prop="zcyjjbj">
              <label slot="label">政策依据<br />以及背景</label>
              <el-input
                type="textarea"
                :rows="2"
                v-model="dialogForm.zcyjjbj"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="业务描述" prop="ywms">
              <el-input
                type="textarea"
                :rows="2"
                v-model="dialogForm.ywms"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="适用行业（范围）说明" prop="mxmc">
              <label slot="label">适用行业<br />（范围）说明</label>
              <el-input
                type="textarea"
                :rows="2"
                v-model="dialogForm.mxmc"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="应对指引" prop="mxmc">
              <el-input
                type="textarea"
                :rows="2"
                v-model="dialogForm.mxmc"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="模型附件(脚本)" prop="mxmc">
              <label slot="label">模型附件<br />（脚本）</label>
              <el-input
                type="textarea"
                :rows="2"
                v-model="dialogForm.mxmc"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="模型有效期" prop="mxmc">
              <el-input v-model="dialogForm.mxmc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="等级划分标准" prop="mxmc">
              <el-input
                type="textarea"
                :rows="2"
                v-model="dialogForm.mxmc"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="扫描周期" prop="mxmc">
              <el-input
                type="textarea"
                :rows="2"
                v-model="dialogForm.mxmc"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="20">
            <span>二、模型指标</span>
          </el-col>
          <el-col :span="2">
            <el-button plain type="primary" @click="addTarget" size="mini"
              >添加指标</el-button
            >
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-table
          :row-class-name="rowClassName"
          :data="dialogTableData"
          @cell-click="cellClick"
        >
          <el-table-column label="序号" prop="xh" width="55"> </el-table-column>
          <el-table-column label="指标名称" prop="zbmc">
            <template slot-scope="scope">
              <span v-show="!scope.row.isEditCell">{{ scope.row.zbmc }}</span>
              <el-input
                v-show="scope.row.isEditCell"
                v-model="scope.row.zbmc"
                placeholder="输入指标名称"
                :ref="'zbmc' + scope.row.$index"
                size="small"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="计算公式" prop="jsgs">
            <template slot-scope="scope">
              <span v-show="!scope.row.isEditCell">{{ scope.row.jsgs }}</span>
              <el-input
                v-show="scope.row.isEditCell"
                v-model="scope.row.jsgs"
                placeholder="输入计算公式"
                :ref="'jsgs' + scope.row.$index"
                size="small"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="指标类型" prop="zblx">
            <template slot-scope="scope">
              <span v-show="!scope.row.isEditCell">{{ scope.row.zblx }}</span>
              <el-input
                v-show="scope.row.isEditCell"
                v-model="scope.row.zblx"
                placeholder="输入指标类型"
                :ref="'zblx' + scope.row.$index"
                size="small"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="数据来源" prop="sjly">
            <template slot-scope="scope">
              <span v-show="!scope.row.isEditCell">{{ scope.row.sjly }}</span>
              <el-input
                v-show="scope.row.isEditCell"
                v-model="scope.row.sjly"
                placeholder="输入数据来源"
                :ref="'sjly' + scope.row.$index"
                size="small"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.isEditCell"
                plain
                type="success"
                size="small"
                @click="saveTarget(scope.row)"
                >保存</el-button
              >
              <el-button
                plain
                type="danger"
                size="small"
                @click="delTarget(scope.row.xh)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getModelList, delModel, delTarget, getSelects, addInfo } from "@/api/model/create";
export default {
  name: "ModelCreateSearch",
  data() {
    return {
      searchForm: {
        mxmc: "",
        qsr: "",
        qsdw: "",
        sqrqq: "",
        sqrqz: "",
        spzt: [2],
        dateTime: [],
        pageNum: 1,
        pageSize: 10,
      },
      models: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      activeName: "first",
      tableData: {
        total: 0,
        data: [],
      },
      dialogVisible: false,
      dialogTitle: "",
      dialogForm: {
        pkid: "",
        mxbm: "",
        mxmc: "",
        mxlx: "",
        ywy: "",
        qsdwdm: "",
        qsdwmc: "",
        gjz: "",
        sfjsfl: "",
        syhy: "",
        sysz: "",
        zcyjjbj: "",
        ywms: "",
        syhysm: "",
        ydzy: "",
        mxfjlj: "",
        mxyxq: "",
        djhfbz: "",
        cjsj: "",
        cjry: "",
        xgsj: "",
        xgry: "",
      },
      dialogRules: {
        mxmc:[
          {required: true, message:'请输入模型名称', trigger:'blur'},
          {min:1, max:100, message:'长度在1到100个字符', trigger: 'blur'}
        ],
        mxlx:[
           { required: true, message: '请选择模型类型', trigger: 'change' }
        ],
        sfjsfl:[
           { required: true, message: '请选择算法技术分类', trigger: 'change' }
        ],
        ywy:[
          { required: true, message: '请选择业务域', trigger: 'change' }
        ],
        gjz:[
          { required: true, message: '请输入关键字', trigger: 'blur' }
        ],
        sysz: [
          {required: true, message: '请选择适用税种', trigger: 'change'}
        ],
        syhy: [
          {required: true, message: '请选择适用行业', trigger: 'change'}
        ],
        zcyjjbj:[
          { required: true, message: '请输入政策依据及背景', trigger: 'blur' }
        ],
        ywms: [
          { required: true, message: '请输入业务描述', trigger: 'blur' }
        ],
        ydzy: [
          { required: true, message: '请输入应对指引', trigger: 'blur' }
        ],
        mxyxq: [
          { required: true, message: '请输入模型有效期', trigger: 'blur' }
        ]
      },
      dialogTableData: [],
    };
  },
  computed: {
    tableIndex: function () {
      return (this.searchForm.pageNum - 1) * this.searchForm.pageSize;
    },
  },
  watch: {
    searchForm: {
      deep: true,
      handler(o) {
        if (o.dateTime) {
          this.searchForm.sqrqq = o.dateTime[0];
          this.searchForm.sqrqz = o.dateTime[1];
        }
      },
    },
    activeName(o) {
      this.searchForm.spzt = o === "first" ? [2] : [3, 4];
      this.search();
    },
  },
  methods: {
    search(event) {
      if (!event || (event && event.type == "click")) {
        this.searchForm.pageNum = 1;
      }
      getModelList(this.searchForm).then(({ total, rows }) => {
        this.tableData.total = total;
        this.tableData.data = rows;
      });
    },
    reset() {
      this.$refs.searchForm.resetFields();
    },
    add() {
      this.dialogVisible = true;
      this.dialogTitle = "新增";
      //初始化下拉框数据
      let arr = [1,2,3,4,5,6];
      arr.forEach((arr) => {
        getSelects(arr).then(({data}) => {
          
        })
      })
    },
    addTarget() {
      this.dialogTableData.push({isEditCell:true, zbmc: "", jsgs: "", zblx: "", sjly: "" });
    },
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1;
    },
    cellClick(row, column, cell, event) {
      if (event.target.localName == "button" || event.target.localName == "span") {
        return;
      }
      this.$set(row, "isEditCell", true);
    },
    saveTarget(row) {
      row.isEditCell = false;
      this.$set(row, "isEditCell", false);
    },
    delTarget(xh) {
      this.$confirm("此操作将永久删除该指标，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delTarget(this.dialogTableData[xh - 1].pkid).then(({ code, msg }) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.dialogTableData.splice(xh - 1, 1);
        });
      });
    },
    del(id) {
      this.$confirm("此操作将永久删除该模型，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delModel(id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.search();
          });
        })
        .catch(() => {
          return;
        });
    },
    save() {
       addInfo(this.dialogForm).then(({code, message, data})=> {
          this.$message({
            type: code === 200?'success':'error',
            message
          })
          if(code === 200) {
            this.search()
            this.closeDialog()
          }
      }) 
    },
    closeDialog() {
      this.$refs.dialogForm.resetFields();
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.search();
  },
};
</script>
 
<style>
</style>