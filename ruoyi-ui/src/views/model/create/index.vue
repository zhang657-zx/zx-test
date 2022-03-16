<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form
          class="demo-form-inline"
          :inline="true"
          :model="searchForm"
          label-width="68px"
        >
          <el-form-item label="模型名称">
            <el-input v-model="searchForm.mxmc"></el-input>
          </el-form-item>
          <el-form-item label="填报人">
              <el-input v-model="searchForm.qsr"></el-input>
          </el-form-item>
          <el-form-item label="填报单位">
              <el-input v-model="searchForm.qsdw"></el-input>
          </el-form-item>
          <el-form-item label="申请日期">
              <el-date-picker
                v-model="searchForm.sqrqq"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
                </el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getModelList } from "@/api/model/create";
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
        pageNum:1,
        pageSize:20
      },
      models: [],
    };
  },
  watch: {
      searchForm:{
          deep:true,
          handler(n, o) {
              console.log(n, o)
          }
      }
  },
  methods: {
    getModelList() {},
  },
};
</script>

<style>
</style>