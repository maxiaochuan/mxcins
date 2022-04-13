import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { tw } from 'twind';
import { DomMover } from '@mxcins/webapi';
import { Tooltip, Button } from '@mxcins/components';

const $id = (id: string) => document.getElementById(id);

const TooltipView = () => {
  return (
    <>
      <div className={tw`flex items-center justify-around pt-[100px] text-xl`}>
        <Tooltip title="title" placement="top">
          <Button type="primary">按钮</Button>
        </Tooltip>
        <Tooltip title="title" placement="topLeft">
          <Button type="primary">按钮</Button>
        </Tooltip>
        <Tooltip title="title" placement="topRight">
          <Button type="primary">按钮</Button>
        </Tooltip>
      </div>
      <div className={tw`flex items-center justify-around pt-[100px] text-xl`}>
        <Tooltip title="title" placement="bottom">
          <Button type="primary">按钮</Button>
        </Tooltip>
        <Tooltip title="title" placement="bottomLeft">
          <Button type="primary">按钮</Button>
        </Tooltip>
        <Tooltip title="title" placement="bottomRight">
          <Button type="primary">按钮</Button>
        </Tooltip>
      </div>
      <div className={tw`flex items-center justify-around pt-[100px] text-xl`}>
        <Tooltip title="title" placement="left">
          <Button type="primary">按钮</Button>
        </Tooltip>
        <Tooltip title="title" placement="leftTop">
          <Button type="primary">按钮</Button>
        </Tooltip>
        <Tooltip title="title" placement="leftBottom">
          <Button type="primary">按钮</Button>
        </Tooltip>
      </div>
      <div className={tw`flex items-center justify-around pt-[100px] text-xl`}>
        <Tooltip title="title" placement="right">
          <Button type="primary">按钮</Button>
        </Tooltip>
        <Tooltip title="title" placement="rightTop">
          <Button type="primary">按钮</Button>
        </Tooltip>
        <Tooltip title="title" placement="rightBottom">
          <Button type="primary">按钮</Button>
        </Tooltip>
      </div>
      <div className={tw`flex items-center justify-center pt-10 text-xl`}>
        <button
          type="button"
          onClick={() =>
            DomMover.align($id('source')!, $id('target')!, {
              points: ['tc', 'cc'],
              offsetX: 10,
              offsetY: -10,
            })
          }
        >
          align
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 36 }}>
        <div
          style={{
            left: 50,
            width: 200,
            height: 200,
            overflowY: 'scroll',
            border: '1px solid black',
          }}
        >
          <div style={{ width: 200, height: 500 }}>
            <div
              id="source"
              className={tw`transition-all`}
              style={{
                position: 'absolute',
                background: 'red',
                left: -20,
                top: -20,
                width: 90,
                height: 90,
              }}
            >
              source
            </div>
            <div id="target" style={{ background: 'yellow', width: 100, height: 100 }}>
              target
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TooltipView;
