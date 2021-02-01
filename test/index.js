const CheckUser = require('../index')

let app = new CheckUser(4, res => {
    console.log(res)
})

app.run()