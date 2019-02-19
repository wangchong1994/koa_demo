const router = require('koa-router')()
const mongoose = require('mongoose')
const db = mongoose.connect("mongodb://localhost/testDB") //加入mongodb链接

// 账户的数据库模型
/*var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String
});
var User = mongoose.model('User',UserSchema);
// 新增数据
var user = {
  username: 'ydj',
  password: '123123',
  email: ''
}
var newUser = new User(user);
newUser.save();*/

var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    mail:String
});

// Schema.method
UserSchema.methods.speak = function () {
  var greeting = this.username
    ? "Meow username is " + this.username
    : "I don't have a username";
  console.log(greeting);
}

var User = mongoose.model('User',UserSchema);
router.get('/mongo', async (ctx, next) => {
  let val = null
  const data = await User.findOne({username: 'ydj'})
  console.log('data', data)
  data.speak();
  const result = {
    code:200,
    response: data,
  }
  ctx.response.body = result
  return result
})

router.post('/creatuser', async (ctx, next) => {
  var user = ctx.request.body;
  let val = null
  const data = await User.findOne({username: user.username})
  let result = {};
  if (data) {
    result = {
      err_code:1,
      err_msg: "err_username_exist"
    }
  } else {
    var newUser = new User(user);
    newUser.save();
    result = {
      err_code:0,
      response: user,
  }
  }
  
  ctx.response.body = result
  return result
})

router.post('/login', async (ctx, next) => {
  var user = ctx.request.body;
  const data = await User.findOne({username: user.username})
  let resdata = {};
  console.log('data', data)
  if(data) {
    if(data.password === user.password) {
      resdata = {
        err_code:0,
        err_msg: "success",
        data,
      };
    } else {
      resdata = {
        err_code:2,
        err_msg: "err_nsername_or_password_wrong"
      }
    }
  } else {
    resdata = {
      err_code: 1,
      err_msg: "err_username_is_not_exist"
    }
  }
  const result = {
    code:200,
    response: resdata,
    ts: 12345
  }
  ctx.response.body = result
  return result
})

router.post('/getuserlist', async (ctx, next) => {
  const data = await User.find();
  let resdata = {};
  console.log('data', data)
  if(data) {
      resdata = {
        err_code:0,
        err_msg: "success",
        data,
      };
  } else {
    resdata = {
      err_code: 1,
      err_msg: "err_unkown"
    }
  }
  const result = {
    code:200,
    response: resdata,
    ts: 12345
  }
  ctx.response.body = result
  return result
})
module.exports = router
