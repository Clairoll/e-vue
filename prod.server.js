var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('', function(req, res, next) {
   req.url = '/index.html' ;
   next();
});

app.use(router);

// 载入自己模拟的后台数据模块
var appData = require('./data.json')// 载入data.json数据
var seller = appData.seller;//接收data.json中商家的相关信息
var goods = appData.goods;//接收data.json中商品的相关信息
var ratings = appData.ratings;//接收data.json中评论的相关信息

var apiRoutes = express.Router();//定义一个路由api
//定义相关的接口
apiRoutes.get('/seller',function(req,res){//定义商家的数据接口
  res.json({//返回一个json数据
    errno: 0,//状态码，返回0表示成功
    data: seller//具体数据
  });
});
apiRoutes.get('/goods',function(req,res){//定义商品的数据接口
  res.json({//返回一个json数据
    errno: 0,//状态码，返回0表示成功
    data: goods//具体数据
  });
});

apiRoutes.get('/ratings',function(req,res){//定义商家的数据接口
  res.json({//返回一个json数据
    errno: 0,//状态码，返回0表示成功
    data: ratings//具体数据
  });
});

app.use('/api',apiRoutes);//调用api路由

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})