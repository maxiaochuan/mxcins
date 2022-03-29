import * as React from 'react';
import { Space, Button } from '@mxcins/components';
import { DomMover } from '@mxcins/webapi';
import { Record } from '../../components';

const $id = (id: string) => document.getElementById(id);

const TooltipView = () => {


  return (
    <>
      <Record title="space">
        <button type="button" onClick={() => DomMover.align($id('source')!, $id('target')!, { points: ['tc', 'cc']})}>align</button>
        <div style={{ left: 50, width: 200, height: 200, overflowY: 'scroll' }}>
          <div style={{ width: 200, height: 500 }}>
            <div id="source" style={{ background: 'red', left: -20, top: -20, width:90, height: 90 }}>source</div>
            <div id="target" style={{ background: 'yellow', width: 100, height: 100 }}>target</div>
          </div>
        </div>
      </Record>
    </>
  );
};

export default TooltipView;
