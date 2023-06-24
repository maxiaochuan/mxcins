import { createApp } from 'vue/dist/vue.esm-bundler.js';
import axios from 'axios';
import monitor from '../src';

import { setupWorker } from 'msw';
import { handlers } from './mock';
void setupWorker(...handlers).start();

let i = 1;

const app = createApp({
  data() {
    return { message: '123', reports: [] };
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
    load() {
      void fetch('/reports')
        .then(async resp => await resp.json())
        .then(data => {
          console.log('data', data);
          this.$data.reports = data;
        });
    },
    screen(id: string) {
      console.log('id', id);
      void fetch(`/screens/${id}`)
        .then(async resp => await resp.json())
        .then(data => {
          const events = monitor.unzip(data.info.events);
          console.log('events', events);
        });
    },
  },
  // <img width="300" height="300" src="https://asdf.asdf.asdf/asdf.png" />
  template: `
    <div>
      <div>
        <div style="display:flex;flex-direction:row;gap:12px;" v-for="report in reports" :key="report.id">
          <div>类型: {{ report.type }}</div>
          <div>screen id: {{ report.cache.screenId }}</div>
          <div><button @click="() => screen(report.cache.screenId)">load screen</button></div>
        </div>
      </div>
      <div>
        {{ message }}
        <button @click="click">button</button>
        <button @click="send">send</button>
        <button @click="fetch">fetch</button>
        <button @click="unhandlerejecterror">unhandlerejecterror</button>
        <button @click="push">push</button>
        <button @click="hash">hash</button>
        <button @click="back">back</button>
        <button @click="load">load</button>
      </div>
    </div>
      `,
});

app.use(monitor, { reportURL: '/reports' });
app.mount('#app');
