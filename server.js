// main modules
const HTTP = require('http');
const FS = require('fs');

// additional modules
const Pug = require('pug');

// libs
const Vocabulary = require('./libs/vocabulary');
const Phrases = require('./libs/phrases');

// framework extensions
const Koa = require('koa');
const Bodyparser = require('koa-body');
const Router = require('koa-router');
const Serve = require('koa-static');

// constants
const PORT = 3000;
const PAGE = FS.readFileSync(__dirname + '/views/layout.pug');

const app = new Koa();

const router = new Router();

router.get('/', async (ctx, next) => {
  const words = Vocabulary.getRandomWords(10);

  let phrases = [];

  for (let i = 0; i < 10; i++) {
    phrases = [...phrases, ...(await Phrases.find(words[i], 3))];
  }

  ctx.body = Pug.compile(PAGE, {})({ phrases, words });
  await next();
});

app.use(Serve(__dirname + '/public'));
app.use(router.routes());
app.use(router.allowedMethods());

const server = HTTP.createServer(app.callback());

server.listen(PORT, () => {
  console.log(`Server work on port ${PORT}...`);
});
