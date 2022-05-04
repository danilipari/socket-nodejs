const express = require('express');
const cors = require("cors");
const helmet = require('helmet');
const colors = require('colors');
require('dotenv').config();
const morgan = require('morgan');

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:'+ process.env.CPORT]
  }
});

app.use(helmet());
app.disable('x-powered-by');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('combined'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
    io.emit('my broadcast', `server: ${msg}`);
  });

  socket.on('refreshList', () => {
    io.emit('refreshList');
  })
});

app.get('/', (req, res) => {
  res.status(200).json(
    {
      route: '/',
      statusCode: 200,
      status: 'success'
    }
  )
})

app.use(cors());
const port = process.env.PORT || 8000;

http.listen(port, () => { console.log(`Socket Project ${port}.`.inverse) });