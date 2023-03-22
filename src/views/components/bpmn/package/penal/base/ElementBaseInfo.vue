<template>
  <div class="panel-tab__content">
    <el-form
      :model="elementBaseInfo"
      size="mini"
      label-width="90px"
      @submit.prevent
    >
      <el-form-item label="ID" prop="id">
        <el-input
          v-model="elementBaseInfo.id"
          :disabled="idEditDisabled"
          clearable
          @change="updateBaseInfo('id')"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="elementBaseInfo.name"
          clearable
          @change="updateBaseInfo('name')"
        />
      </el-form-item>
      <el-form-item label="所属平台" prop="tenantId">
        <el-select
          v-model="elementBaseInfo.tenantId"
          @change="val => updateBaseInfo('tenantId', val)"
        >
          <el-option
            v-for="dict in dict.type.process_order_tenant"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="流程分类" prop="processCategory">
        <treeselect
          :normalizer="normalizer"
          @change="val => updateBaseInfo('processCategory', val)"
          v-model="elementBaseInfo.processCategory"
          :options="ProcessCategoryDict"
          placeholder="选择流程分类"
        />
      </el-form-item>
      <!--流程的基础属性-->
      <template v-if="elementBaseInfo.$type === 'bpmn:Process'">
        <el-form-item label="版本标签" prop="versionTag">
          <el-input
            v-model="elementBaseInfo.versionTag"
            clearable
            @change="updateBaseInfo('versionTag')"
          />
        </el-form-item>
        <el-form-item label="可执行" prop="isExecutable">
          <el-switch
            v-model="elementBaseInfo.isExecutable"
            active-text="是"
            inactive-text="否"
            @change="updateBaseInfo('isExecutable')"
          />
        </el-form-item>
      </template>
      <el-form-item
        prop="isExpanded"
        v-if="elementBaseInfo.$type === 'bpmn:SubProcess'"
        label="状态"
      >
        <el-switch
          v-model="elementBaseInfo.isExpanded"
          active-text="展开"
          inactive-text="折叠"
          @change="updateBaseInfo('isExpanded')"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getProcessDict } from "@/api/workflow/model";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "ElementBaseInfo",
  dicts: ["process_category", "process_order_tenant"],
  components: { Treeselect },
  props: {
    businessObject: Object,
    type: String,
    idEditDisabled: {
      type: Boolean,
      default: true
    },
    processCategory: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      elementBaseInfo: {},
      ProcessCategoryDict: []
    };
  },
  watch: {
    businessObject: {
      immediate: false,
      handler: function (val) {
        if (val) {
          this.$nextTick(() => this.resetBaseInfo());
        }
      }
    }
  },
  methods: {
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.categoryName,
        children: node.children
      };
    },
    // 选择所属平台事件
    onSelectPlatform(val) {
      getProcessDict(val).then(r => {
        this.ProcessCategoryDict = r.data;
      });
    },
    changeSleCat(val) {
      this.$emit("changeSleCat", val);
    },
    resetBaseInfo() {
      this.bpmnElement = window?.bpmnInstances?.bpmnElement || {};
      this.elementBaseInfo = JSON.parse(
        JSON.stringify(this.bpmnElement.businessObject)
      );
      if (
        this.elementBaseInfo &&
        this.elementBaseInfo.$type === "bpmn:SubProcess"
      ) {
        this.$set(
          this.elementBaseInfo,
          "isExpanded",
          this.elementBaseInfo.di?.isExpanded
        );
      }
    },
    updateBaseInfo(key, val) {
      if (key === "id") {
        this.$store.commit("app/CHANGEPROCESSKEY", this.elementBaseInfo[key]);
        window.bpmnInstances.modeling.updateProperties(this.bpmnElement, {
          id: this.elementBaseInfo[key],
          di: { id: `${this.elementBaseInfo[key]}_di` }
        });
        return;
      }
      if (key === "isExpanded") {
        window?.bpmnInstances?.modeling.toggleCollapse(this.bpmnElement);
        return;
      }
      // 选择所属平台
      if (key === "tenantId") {
        getProcessDict(val).then(r => {
          this.ProcessCategoryDict = r.data;
        });
      }
      // 选择流程分类
      if (key === "processCategory") {
        this.$emit("changeSleCat", val);
      }
      const attrObj = Object.create(null);
      attrObj[key] = this.elementBaseInfo[key];
      window.bpmnInstances.modeling.updateProperties(this.bpmnElement, attrObj);
    }
  },
  beforeUnmount() {
    this.bpmnElement = null;
  }
};
</script>
<style scoped lang="scss">
.el-select {
  width: 100%;
}
::v-deep .vue-treeselect__control {
  padding-left: 10px;
  height: 28px;
}
::v-deep .vue-treeselect__single-value {
  line-height: 28px;
  font-size: 12px;
}
::v-deep .vue-treeselect__placeholder {
  line-height: 28px;
  font-size: 12px;
}
</style>
