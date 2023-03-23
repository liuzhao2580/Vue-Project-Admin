<!--
 * @Author: Do.Xiong
 * @Date: 2022-08-26 17:40:06
 * @LastEditTime: 2022-09-15 18:27:50
 * @Description:
-->
<template>
  <div style="margin-top: 16px">
    <el-form-item label="处理用户">
      <!-- <el-select v-model="userTaskForm.assignee" @change="updateElementTask('assignee')">
        <el-option v-for="ak in mockData" :key="'ass-' + ak" :label="`${ak}`" :value="`${ak}`" />
      </el-select> -->
      <el-button @click="dialogVisible = !dialogVisible"
        >选择处理用户</el-button
      >
    </el-form-item>
    <el-form-item label="候选用户">
      <el-select
        v-model="userTaskForm.candidateUsers"
        multiple
        collapse-tags
        @change="updateElementTask('candidateUsers')"
      >
        <el-option
          v-for="uk in mockData"
          :key="'user-' + uk"
          :label="`用户${uk}`"
          :value="`user${uk}`"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="候选分组">
      <el-select
        v-model="userTaskForm.candidateGroups"
        multiple
        collapse-tags
        @change="updateElementTask('candidateGroups')"
      >
        <el-option
          v-for="gk in mockData"
          :key="'ass-' + gk"
          :label="`分组${gk}`"
          :value="`group${gk}`"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="到期时间">
      <el-input
        v-model="userTaskForm.dueDate"
        clearable
        @change="updateElementTask('dueDate')"
      />
    </el-form-item>
    <el-form-item label="跟踪时间">
      <el-input
        v-model="userTaskForm.followUpDate"
        clearable
        @change="updateElementTask('followUpDate')"
      />
    </el-form-item>
    <el-form-item label="优先级">
      <el-input
        v-model="userTaskForm.priority"
        clearable
        @change="updateElementTask('priority')"
      />
    </el-form-item>
    <el-dialog
      title="选择处理用户"
      v-model:visible="dialogVisible"
      width="500px"
      append-to-body
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="处理用户" prop="personType">
          <el-radio-group v-model="form.personType" @change="changeType">
            <el-radio label="admin">用户</el-radio>
            <el-radio label="$role">角色</el-radio>
            <!--            <el-radio label="$dept">部门</el-radio>-->
            <!--            <el-radio label="$var">变量</el-radio>-->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审批人员" prop="personName">
          <el-select v-model="form.personName" v-if="!showTree" clearable>
            <template v-if="!isVar">
              <el-option
                v-for="(option, index) in options"
                :key="index"
                :label="option.userName || option.roleName"
                :value="option.userName || option.roleKey"
              />
            </template>
            <template v-else>
              <el-option
                v-for="dict in dict.type.process_variables"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </template>
          </el-select>
          <treeselect
            v-else
            v-model="form.personName"
            :options="options"
            clearable
            placeholder="请选择部门菜单"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  dicts: ["process_variables"],
  name: "UserTask",
  props: {
    id: String,
    type: String
  },
  components: { Treeselect },
  data() {
    return {
      defaultTaskForm: {
        assignee: "",
        candidateUsers: [],
        candidateGroups: [],
        dueDate: "",
        followUpDate: "",
        priority: ""
      },
      userTaskForm: {},
      mockData: ["processtest1", "processtest2", "admin", 4, 5, 6, 7, 8, 9, 10],
      dialogVisible: false,
      form: {
        personType: "",
        personName: ""
      },
      options: [],
      showTree: false,
      isVar: false
    };
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.bpmnElement = window.bpmnInstances.bpmnElement;
        this.$nextTick(() => this.resetTaskForm());
      }
    }
  },
  methods: {
    resetTaskForm() {
      for (let key in this.defaultTaskForm) {
        let value;
        if (key === "candidateUsers" || key === "candidateGroups") {
          value = this.bpmnElement?.businessObject[key]
            ? this.bpmnElement.businessObject[key].split(",")
            : [];
        } else {
          value =
            this.bpmnElement?.businessObject[key] || this.defaultTaskForm[key];
        }
        this.$set(this.userTaskForm, key, value);
        if (key === "assignee") {
          // 回显用户弹窗表单
          if (value.includes("$role")) {
            this.changeType("$role");
            this.form.personType = "$role";
            this.form.personName = value.slice(6);
          } else if (value.includes("$dept")) {
            this.changeType("$dept");
            this.form.personType = "$dept";
            this.form.personName = value.slice(6);
          } else if (value.includes("$var")) {
            this.changeType("$var");
            this.form.personType = "$var";
            this.form.personName = value.slice(5);
          } else if (value !== "") {
            this.changeType("admin");
            this.form.personType = "admin";
            this.form.personName = value;
          }
        }
      }
    },
    updateElementTask(key) {
      const taskAttr = Object.create(null);
      if (key === "candidateUsers" || key === "candidateGroups") {
        taskAttr[key] =
          this.userTaskForm[key] && this.userTaskForm[key].length
            ? this.userTaskForm[key].join()
            : null;
      } else {
        taskAttr[key] = this.userTaskForm[key] || null;
      }
      window.bpmnInstances.modeling.updateProperties(
        this.bpmnElement,
        taskAttr
      );
    },
    // 取消按钮
    cancel() {
      this.dialogVisible = false;
    },
    submitForm() {
      if (this.form.personType === "$dept") {
        this.userTaskForm.assignee =
          this.form.personType + ":" + this.form.personName;
      } else {
        if (this.form.personType === "admin") {
          this.userTaskForm.assignee = this.form.personName;
        } else {
          this.userTaskForm.assignee =
            this.form.personType + ":" + this.form.personName;
        }
      }
      this.updateElementTask("assignee");
      this.dialogVisible = false;
    },
    changeType(key) {
      switch (key) {
        case "admin":
          this.form.personName = "";
          this.options = [];
          this.showTree = false;
          this.isVar = false;
          break;
        case "$role":
          this.form.personName = "";
          this.options = [];
          this.showTree = false;
          this.isVar = false;
          break;
        case "$dept":
          this.form.personName = "";
          this.options = [];
          this.form.personName = undefined;
          this.showTree = true;
          break;
        case "$var":
          this.form.personName = "";
          this.showTree = false;
          this.isVar = true;
          break;
        default:
          break;
      }
    }
  },
  beforeUnmount() {
    this.bpmnElement = null;
  }
};
</script>
