import { Twind } from '@components';
import { DomMover } from '@webapi';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useEffect } from 'react';

export default {
  title: 'webapi/dom',
}

export const move = () => {
  useEffect(() => {
    const box1 = document.querySelector<HTMLDivElement>('#box1');
    const box2 = document.querySelector<HTMLDivElement>('#box2');
    DomMover.align(box2!, box1!, { points: ['tc', 'br'], offsetX: -100 });
  }, []);


  return (
    <div className={Twind.tw("relative h-[400px] w-[400px] bg-primary")}>
      <div id="box1" className={Twind.tw("relative w-10 h-10 bg-white top-1 left-1")}></div>
      <div id="box2" className={Twind.tw("absolute w-10 h-10 bg-black top-1 right-1")}></div>
    </div>
  )
};
