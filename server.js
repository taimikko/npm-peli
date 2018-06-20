import serve from 'koa-static';
import Koa from 'koa';
import { shuffle } from 'lodash';

const app = new Koa();

app.use(serve('.'));

app.listen(3000);

console.log('mitähän siellä portissa 3000 tapahtuu?');
