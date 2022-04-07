## 图片上传

##### 主要功能是图片上传、预览、删除

### 使用方法
:::demo 组件使用示例

```html
  <e-upload :url="url" @getImgData="getImgData"/>
  
  <script>
 export default {
   data() {
     return {
        url: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg']
     }
   },
   methods: {
     // 获取当前列表图片信息
        getImgData(imgdata, imgbase) {
            console.log(imgdata, imgbase);
        },
   }
 }
 </script>
```

:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| url     | 图片地址   | array  |   []           |    []     |

### Methods

| 方法名      | 说明    | 参数    |
|---------- |-------- |---------- |
| getData    | 获取图片   |  第一个参数为图片信息，第二个参数为图片base64编码数据  |

