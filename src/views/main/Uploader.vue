<template>
  <div>
    <template v-if="previewMode">
      <template v-for="(img, index) in file_images">
        <a-tooltip :key="index">
          <span slot="title">{{img.name}}</span>
          <div class="preview-uploads-card">
            <a-icon
              class="preview-uploads-card-close"
              type="close-circle"
              @click="removeFileList(index)"
            ></a-icon>
            <img :src="img.imageUrl" width="50" />
            <div
              :key="`preview${index}`"
              class="preview-uploads-card-view"
              @click="preview_file_list=img"
            >
              <span>View</span>
            </div>
          </div>
        </a-tooltip>
      </template>
      <a-modal
        :width="300"
        :visible="preview_file_list.imageUrl && preview_file_list.imageUrl !== ''"
        title="Preview Image"
        :footer="null"
        class="modal-preview-image"
        @cancel="preview_file_list={}"
      >
        <a-tooltip>
          <span slot="title">{{preview_file_list.name}}</span>
          <img :src="preview_file_list.imageUrl" :alt="preview_file_list.name" />
        </a-tooltip>
      </a-modal>
    </template>
    <template v-else>
      <a-upload :multiple="true" :showUploadList="false" :beforeUpload="attachFile">
        <a-icon type="upload" style="cursor: pointer" v-if="icon"></a-icon>
        <a-button v-else type="default" :loading="loading" size="small">{{label}}</a-button>
      </a-upload>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    previewMode: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: "Upload"
    }
  },
  data() {
    return {
      file_list: [],
      file_images: [],
      preview_file_list: {}
    };
  },
  methods: {
    attachFile(file) {
      console.log("file :", file);
      this.file_list = [...this.file_list, file];
      this.getBase64(file, imageUrl => {
        this.file_images = [...this.file_images, { imageUrl, name: file.name }];
      });
      console.log("this.file_list :", this.file_list);
      var form_data = null;
      const { file_list, file_images } = this;
      if (this.file_list.length) {
        form_data = new FormData();
        this.file_list.forEach(file => {
          form_data.append("files", file, file.name);
        });
      }
      this.$emit("upload", { form_data, file_list, file_images });
    },
    removeFileList(i) {
      this.file_list.splice(i, 1);
      this.file_images.splice(i, 1);
    },
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    }
  }
};
</script>

<style>
.preview-uploads-card {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  width: 62px;
  height: 65px;
  float: left;
  margin: 0 3px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-uploads-card-view {
  position: absolute;
  top: 5px;
  width: 85%;
  height: 85%;
  text-align: center;
  color: black;
  font-weight: bold;
  background: #aaa;
  opacity: 0;
  cursor: pointer;
}

.preview-uploads-card-view:hover {
  opacity: 0.8;
}

.preview-uploads-card-close {
  position: absolute;
  right: -5px;
  top: -5px;
  color: red;
  cursor: pointer;
}

.preview-uploads-card-close:hover {
  font-size: 18px;
  font-weight: bold;
}

.modal-preview-image .ant-modal-body {
  padding: 0px !important;
}

.modal-preview-image img {
  height: 100%;
  width: 100%;
}
</style>