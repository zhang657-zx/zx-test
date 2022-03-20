<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          prefix-icon="el-icon-search"
          style="margin-bottom: 20px"
        ></el-input>
        <el-tree
          :style="{ height: scrollerHeight, overflowY: 'auto' }"
          :data="treeData"
          :props="defaultProps"
          :filter-node-method="filterNode"
          node-key="pkid"
          ref="tree"
          :current-node-key="currentNode.pkid"
          :highlight-current="true"
          default-expand-all
          @node-click="search"
        ></el-tree>
      </el-col>
      <el-col :span="18">
        <el-row :gutter="28">
          <el-col :span="24">
            <el-form
              :model="searchForm"
              :inline="true"
              class="demo-form-inline"
              label-width="68px"
            >
              <el-form-item label="指标名称" :prop="searchForm.zbmc">
                <el-input
                  v-model="searchForm.zbmc"
                  placeholder="请输入指标名称"
                  clearable
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  plain
                  type="primary"
                  size="mini"
                  icon="el-icon-search"
                  @click="search"
                  >查询</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button
                  plain
                  type="warning"
                  size="mini"
                  icon="el-icon-plus"
                  @click="add"
                  >新增</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-table :data="tableData.rows" stripe style="margin-top: 5px">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" width="50">
            <template slot-scope="scope">
              <span>{{ tableIndex + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="指标编码"
            prop="zbbm"
            width="100"
          ></el-table-column>
          <el-table-column label="指标名称" prop="zbmc" width="100">
            <template slot-scope="scope">
              <el-link type="primary" @click="see(scope.row.pkid)">{{
                scope.row.zbmc
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            prop="cjsj"
            width="115"
          ></el-table-column>
          <el-table-column label="创建人员" prop="cjry"></el-table-column>
          <el-table-column
            label="修改时间"
            prop="xgsj"
            width="115"
          ></el-table-column>
          <el-table-column label="修改人员" prop="xgry"></el-table-column>
          <el-table-column label="操作" width="170">
            <template slot-scope="scope">
              <el-button
                plain
                type="success"
                size="mini"
                icon="el-icon-edit"
                @click="update(scope.row.pkid)"
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
          @pagination="search(undefined, $event)"
        />
      </el-col>
    </el-row>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogTableVisible"
      :before-close="closeDialog"
    >
      <el-form
        ref="dialogForm"
        :disabled="disabled"
        :model="dialogForm"
        label-width="80px"
      >
        <el-form-item label="指标目录">
          <el-input v-model="dialogForm.zbml" disabled></el-input>
        </el-form-item>
        <el-form-item label="指标编码" prop="zbbm">
          <el-input v-model="dialogForm.zbbm"></el-input>
        </el-form-item>
        <el-form-item label="指标名称" prop="zbmc">
          <el-input v-model="dialogForm.zbmc"></el-input>
        </el-form-item>
        <el-form-item label="指标类型" prop="zblx">
          <el-radio v-model="dialogForm.zblx" label="0" border>目录</el-radio>
          <el-radio v-model="dialogForm.zblx" label="1" border>指标</el-radio>
        </el-form-item>
        <el-form-item
          label="业务描述"
          prop="ywms"
          v-show="dialogForm.zblx == 1"
        >
          <el-input v-model="dialogForm.ywms"></el-input>
        </el-form-item>
        <el-form-item
          label="计算公式"
          prop="jsgs"
          v-show="dialogForm.zblx == 1"
        >
          <el-input v-model="dialogForm.jsgs"></el-input>
        </el-form-item>
        <el-form-item
          label="更新周期"
          prop="gxzq"
          v-show="dialogForm.zblx == 1"
        >
          <el-input v-model="dialogForm.gxzq"></el-input>
        </el-form-item>
        <el-form-item label="创建人员" prop="cjry" v-show="!disabled">
          <el-input v-model="dialogForm.cjry"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="cjsj" v-show="!disabled">
          <el-input v-model="dialogForm.cjsj"></el-input>
        </el-form-item>
        <el-form-item label="修改人员" prop="xgry" v-show="!disabled">
          <el-input v-model="dialogForm.xgry"></el-input>
        </el-form-item>
        <el-form-item label="修改时间" prop="xgsj" v-show="!disabled">
          <el-input v-model="dialogForm.xgsj"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="dialogTitle !== '查看'">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else>
        <el-button @click="closeDialog">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  getTreeList,
  getInfo,
  addInfo,
  delInfo,
} from "@/api/target/targetMenu";
export default {
  name: "TargetMenuIndex",
  data() {
    return {
      searchForm: {
        zbmc: "",
        sjzbid: "",
        sjzbmc: "",
        pageNum: 1,
        pageSize: 10,
      },
      dialogForm: {
        pkid: "",
        zbml: "",
        gxzq: "",
        jsgs: "",
        ywms: "",
        yxbz: "",
        sjzbid: "",
        zblx: "",
        zbmc: "",
        zbbm: "",
        sjzbmc: "",
        cjry: "",
        cjrymc: "",
        cjsj: "",
        xgry: "",
        xgrymc: "",
        xgsj: "",
      },
      filterText: "",
      dialogTitle: "",
      dialogTableVisible: false,
      disabled: false,
      tableData: {
        total: 0,
        rows: [],
      },
      treeData: [],
      currentNode: "",
      defaultProps: {
        children: "children",
        label: "zbmc",
      },
    };
  },
  watch: {
    filterText(v) {
      this.$refs.tree.filter(v);
    },
  },
  computed: {
    scrollerHeight: function () {
      return window.innerHeight - 50 + "px";
    },
    tableIndex: function () {
      return (this.searchForm.pageNum - 1) * this.searchForm.pageSize;
    },
  },
  methods: {
    async getTreeList() {
      let result = await getTreeList();
      this.treeData = result.rows;
      this.currentNode = this.treeData[0];
      this.$nextTick(() => {
        this.$refs.tree.setCurrentNode(this.treeData[0]);
      });
    },
    search(v, event) {
      this.searchForm.sjzbid = v ? v.pkid : this.currentNode.pkid;
      this.dialogForm.zbml = v ? v.label : this.currentNode.label;
      this.searchForm.pageNum = v ? 1 : event ? this.searchForm.pageNum : 1;
      getList(this.searchForm).then(({ total, rows }) => {
        this.tableData.rows = rows;
        this.tableData.total = total;
      });
    },
    see(pkid) {
      this.dialogTitle = "查看";
      this.dialogTableVisible = true;
      this.disabled = true;
      let zbml = this.dialogForm.zbml;
      getInfo(pkid).then(({ data }) => {
        this.dialogForm = data;
        this.dialogForm.zbml = zbml;
      });
    },
    add() {
      this.dialogTitle = "新增";
      this.dialogTableVisible = true;
      this.disabled = false;
    },
    update(v) {
      this.dialogTitle = "修改";
      this.dialogTableVisible = true;
      this.disabled = false;
      let zbml = this.dialogForm.zbml;
      getInfo(v).then(({ data }) => {
        this.dialogForm = data;
        this.dialogForm.zbml = zbml;
      });
    },
    del(v) {
      this.$confirm("此操作将永久删除该指标，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delInfo(v).then(({code,message}) => {
            this.$message({
              type: code == 200?"success":"error",
              message,
            });
            this.search();
          });
        })
        .catch(() => {
          return;
        });
    },
    save() {
      addInfo(this.dialogForm).then(({ code, message, data }) => {
        this.$message({
          type: code === 200 ? "success" : "error",
          message,
        });
        if (code === 200) {
          this.search();
          this.closeDialog();
        }
      });
    },
    closeDialog() {
      this.$refs.dialogForm.resetFields();
      this.dialogForm.zblx = "0";
      this.dialogTableVisible = false;
    },
    filterNode(v, d) {
      if (!v) return true;
      return d.label.indexOf(v) !== -1;
    },
  },
  mounted() {
    this.getTreeList().then(() => {
      this.search();
    });
  },
};
</script>

<style>
/* .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #1890ff;
} */
</style>