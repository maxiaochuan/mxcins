import * as React from 'react';
import request from '@mxcins/request';

export default class RequestPage extends React.Component {
  async componentDidMount() {
    const resp = await request('http://localhost:5000', {});
    console.log(resp);
  }
  render() {
    return '1';
  }
}
