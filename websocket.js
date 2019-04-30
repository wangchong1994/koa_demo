const Koa = require('koa');
  const WebSocket = require('ws');

  const app = new Koa();
  const ws = new WebSocket.Server({port: 8888});

  ws.on('connection', ws => {
      console.log('server connection');

      ws.on('message', msg => {
        console.log('server receive msg：', msg);
      });

      ws.send('Information from the server');
  });

  app.listen(3000);