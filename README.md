### 自动检测Github用户名

---

#### 示例：

```js
const CheckUser = require('@ziki/check-github-user')

let app = new CheckUser(4, res => {
    console.log(res)
})

app.run()

```