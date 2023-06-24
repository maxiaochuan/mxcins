import { createApp } from 'vue/dist/vue.esm-bundler.js';
import axios from 'axios';
import monitor from '../src';

let i = 1;

const app = createApp({
  data() {
    return { message: '123' };
  },
  methods: {
    click() {
      throw new Error('e');
    },
    send() {
      void axios.get('/user/12345').then(resp => {
        console.log('resp', resp);
      });
    },
    fetch() {
      void fetch('/user/12345');
    },
    unhandlerejecterror() {
      void new Promise(() => {
        throw new Error('wer');
      });
    },
    push() {
      history.pushState({ page: i }, `title ${i}`, `?page=${i}`);
      i += 1;
    },
    hash() {
      location.hash = `#asdflkj${i}`;
      i += 1;
    },
    back() {
      history.back();
    },
  },
  template: `
      <div>
        {{ message }}
        <img width="300" height="300" src="https://asdf.asdf.asdf/asdf.png" />
        <button @click="click">button</button>
        <button @click="send">send</button>
        <button @click="fetch">fetch</button>
        <button @click="unhandlerejecterror">unhandlerejecterror</button>
        <button @click="push">push</button>
        <button @click="hash">hash</button>
        <button @click="back">back</button>
      </div>
      `,
});

app.use(monitor, { reportURL: 'asdf' });
app.mount('#app');
