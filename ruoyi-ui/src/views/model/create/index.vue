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
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-refresh"
              @click="reset"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 放个样式过来，实际使用的是同一个表格，就是数据不一致 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="待审批" name="first">
      </el-tab-pane>
      <el-tab-pane label="已审批" name="second">
      </el-tab-pane>
    </el-tabs>
    <el-table :data="tableData.data" stripe style="margin-top: 5px">
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">
          <span>{{ tableIndex + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模型编码" prop="mxbm"></el-table-column>
      <el-table-column label="模型名称" prop="mxmc" width="100">
        <template slot-scope="scope">
          <el-link type="primary" @click="see(scope.row.pkid)">{{
            scope.row.mxmc
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="申请处室"
        prop="qsdwmc"
        width="115"
      ></el-table-column>
      <el-table-column label="申请时间" prop="cjsj"></el-table-column>
    </el-table>
    <pagination
      v-show="tableData.total > 0"
      :total="!tableData.total ? 0 : tableData.total"
      :page.sync="searchForm.pageNum"
      :limit.sync="searchForm.pageSize"
      @pagination="search"
    />
  </div>
</template>

<script>
import {getModelList} from '@/api/model/create'
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
        state:0,
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
      tableData:{
        total:0,
        data:[]
      },
    };
  },
  computed: {
    tableIndex: function() {
      return (this.searchForm.pageNum - 1) * this.searchForm.pageSize
    }
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
    activeName(o){
      this.searchForm.state = o==='first'?0:1
      this.search()
    }
  },
  methods: {
    search(event) {
      console.log(event, !event)
      if(!event || (event && event.type == 'click')){ this.searchForm.pageNum = 1}
      getModelList(this.searchForm).then(({total, data }) => {
        this.tableData.total = total
        this.tableData.data = data
      });
    },
    reset() {
      this.$refs.searchForm.resetFields();
    },
  },
  mounted() {
    this.search()
  }
};
</script>

<style>
</style>