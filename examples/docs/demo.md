## 组件名称

##### 组件用途说明

### 高频用法
:::demo 组件使用示例

```html
  <e-button class='ecos-btn' type="primary" @click="handleClick">组件示例</e-button>
  <style>
  .ecos-btn {
    margin-right: 20px;
  }
  </style> 
  <script>
 export default {
   methods: {
     handleClick(){
       console.log('点击被点击');
     }
   }
 }
 </script>
```

:::

### Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   default,medium,small            |    —     |

### Methods

| 方法名      | 说明    | 参数    |
|---------- |-------- |---------- |
| click    | 点击事件   | event对象    |

