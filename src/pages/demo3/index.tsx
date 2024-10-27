import { Button, List, Radio, Typography } from "antd";
import { useState } from "react";
import { SortableContainer, SortableElement, } from "react-sortable-hoc";
import { arrayMoveImmutable } from 'array-move';
import './index.scss'
export default function Demo3() {
  const [data, setData] = useState<string[]>([
    'item1',
    'item2',
    'item3',
    'item4',
    'item5',
  ]);
  const SortableItem = SortableElement(({ value, isDragging }) => {
    return (
      <li className="sort_item">{value}</li>
    )
  }

  );

  const SortableList = SortableContainer(() => {
    return (
      <ul
        className="sort_list"
      >
        {
          data.map((value, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} />
          ))
        }
      </ul>
    );
  });
  return (
    <div>
      <Radio.Group defaultValue="all">
        <Radio.Button value="all">全部</Radio.Button>
        <Radio.Button value="unFinish">未完成</Radio.Button>
        <Radio.Button value="finish">已完成</Radio.Button>
      </Radio.Group>
      <Button
        onClick={() => {
          setData([...data, `item${data.length+1}`]);
        }}
      >
        添加
      </Button>
      <SortableList
        lockToContainerEdges
        helperClass="sort_item_dragging"
        axis="y"
        lockAxis="y"
        pressDelay={100}
        onSortEnd={({ oldIndex, newIndex }) => {
          setData(arrayMoveImmutable(data, oldIndex, newIndex));
        }}
      />
    </div>


  );
}