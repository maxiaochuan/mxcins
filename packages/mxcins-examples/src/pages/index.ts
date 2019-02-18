import * as React from 'react';
import { arr2obj } from '@mxcins/lodash';

export default class Index extends React.Component {
  componentDidMount() {
    const arr = [
      { id: 1, name: 'xiaochuan' },
    ];
    console.log(arr2obj(arr));
  }
  render() {
    return '1';
  }
}