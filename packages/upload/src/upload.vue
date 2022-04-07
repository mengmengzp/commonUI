<!--
 * @file: 该文件的描述信息
 * @author: Lv Mengmeng
-->
<template>
<div class="img-upload">
    <div class="img-list" v-for="(item,index) in imgList" :key="index">
    <el-image 
        class="image"
        :src="item" 
        fit="cover"
        :preview-src-list="imgList">
    </el-image>
    <span v-if="show" class="hidden" @click="setCheck(index)"></span>
    <el-checkbox  v-if="show" @change="change(checked)" v-model="checked[index]"></el-checkbox>
</div>

    <el-upload
    v-if="!onlyPreview"
    class="upload"
    action="#"
    :limit="5"
    multiple
    :on-change="getFile"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    list-type="picture-card"
    :auto-upload="false">
        <i  slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
        <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
        >
        </div>
    </el-upload>
    
    <div class="operation" v-if="show">
            <el-button style="color:#666" type="text" @click="cancle">取消</el-button>
            <el-button type="text" @click="delImg">删除</el-button>
    </div>
    <div v-show="imgList.length > 0 &&  !onlyPreview" v-else class="minus" @click="showDel">
    
    <i  class="el-icon-minus icon"></i>
</div>
</div>

</template>

<script>
export default {
    name: 'EUpload',
    props: ['url', 'onlyPreview'],
    data() {
        return {

            // 删除勾选
            checked: [],
            // 默认列表图片列表为空
            fileList: [],
            // 上传图片转码数组
            basePic: [],
            // 是否显示删除勾选
            show: false,
            // 图片列表
            imgList: this.url || []
            // 默认传递的图片
            //   autoPic: []
        };
    },
    watch: {
        url(val, old) {
            this.imgList = [].concat(val);
            console.log(this.imgList);
        },
        imgList(val, old) {
            this.$emit('getImgData', this.imgList, this.basePic);
        },
        show(val, old) {
            this.$emit('changeShow', this.show);
        }
    },
    methods: {
        // 显示删除
        showDel() {
            this.show = true;
            console.log(this.fileList);
            // 清空勾选框
            for (let i = 0; i < (this.url || []).length; i++) {
                this.checked[i] = false;
            }
        },
        // 取消删除
        cancle() {
            this.show = false;
            this.checked = [];
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        // 状态发生改变时触发
        getFile(file, fileList) {
            this.imgList.push(file.url);
            // 转换base64提交给后端
            this.getBase64(file.raw).then(res => {
                const base = res.split(',');
                this.basePic.push(base[1]);
            });
        },
        // 转为base64图片格式
        getBase64(file) {
            return new Promise(function(resolve, reject) {
                const reader = new FileReader();
                let imgResult = '';
                reader.readAsDataURL(file);
                reader.onload = function() {
                    imgResult = reader.result;
                };
                reader.onerror = function(error) {
                    reject(error);
                };
                reader.onloadend = function() {
                    resolve(imgResult);
                };
            });
        },
        // 勾选框change事件
        change(val) {
            this.checked = [];
            this.checked = val;
        },
        // 点击图片实现勾选功能
        setCheck(index) {
            const temp = [].concat(this.checked);
            this.checked = [];
            temp.map((item, num) => {
                if (index === num) {
                    temp[index] = !item;
                }
            });
            this.checked = temp;
        },
        // 删除图片
        delImg() {
            const checkData = [];
            const noCheckData = [];
            const basePicTemp = [];
            const httpPre = [];
            this.imgList.map((item, index) => {
                if (item.indexOf('blob') === -1) {
                    httpPre.push(item);
                }
                if (this.checked[index]) {
                    checkData.push(item);
                } else {
                    noCheckData.push(item);
                    if (index >= httpPre.length && this.basePic.length && this.basePic[index - httpPre.length]) {
                        basePicTemp.push(this.basePic[index - httpPre.length]);
                    }
                }
            });
            if (checkData.length === 0) return;
            this.$confirm('确定删除这' + checkData.length + '张图片？', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.basePic = [].concat(basePicTemp);
                    this.imgList = [];
                    this.imgList = [].concat(noCheckData);
                    this.show = false;
                })
                .catch(() => {});
        }
    }
};
</script>

<style lang="stylus">
.img-upload {
    margin-top: 8px;
    width :380px;
    .operation {
        position: absolute;
    }
    .img-list {
    display: inline-block;
    margin: 6px 6px 6px 0;
    position: relative;
}
.image {
    width: 80px;
    height: 80px;
}
.hidden {
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    height: 100px;
    display: inline-block;
    &:hover {
        cursor pointer
    }
}

.el-image-viewer__close {
    font-size: 32px;
    top: 20px!important;
    right: 20px!important;
}

label.el-checkbox {
    position: absolute;
    right: 0px;
}
.icon {
    color:#8C939D;
    font-size: 28px;
}
.upload {
    display: inline;
}
.el-icon-plus {
    position: relative;
    bottom: 28px;
}
.el-upload--picture-card {
    width: 80px;
    height: 80px;
    border: 1px solid #DCDFE6;
    border-radius: 0;
    margin-top: 6px;
    background-color:#fff
    margin-left: 0px;
    &:hover {
        cursor: pointer;
        border-color:#409EFF;
    }
}

.el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
    border: 1px solid #c0ccda;
    border-radius: 0;
    display: none;
}
/deep/.el-checkbox__input {
    vertical-align :top;
}
.minus,.operation {
    display: inline-block;
    width: 78px;
    height: 78px;
    line-height: 86px;
    background-color: #fff;
    text-align: center;
    border: 1px solid #DCDFE6;
    margin-top: 6px;
    vertical-align :top;
    position: relative;
    margin-left: 0px;
    &:hover {
        cursor: pointer;
        border-color:#409EFF;
    }
}
.operation {
    border: 0;
    background: #fff;
}
}

</style>