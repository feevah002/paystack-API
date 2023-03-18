const app = require('../app')
const PORT = process.env.PORT

app.listen(PORT, (err)=>{
  err? console.log(err): console.log(`server started successfully at PORT: ${PORT}`);
})
