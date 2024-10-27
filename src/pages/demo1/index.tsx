
import { useEffect, useRef, useState } from 'react';
import { getRangeRandom } from '../../utils';
import { Button, Card, message } from 'antd';
import { useUpdateEffect } from 'ahooks';
import './index.scss'


function Item(props: {
  item: any,
  index: number
}) {
  const { item, index } = props;
  return (
    <Card
      hoverable
      className="grid-item"
      style={{
        width: 200,
        marginBottom: 10,
        height: item.height,
        borderColor: '#ccc',
      }}
      onClick={() => {
        message.success(`click${index + 1}`,)
      }}
    >
      <p>序号：{index + 1}</p>
      <p>高度：{item.height}</p>
    </Card>
  )
}
const loadNum = 5;
export default function Demo1() {
  const [data, setData] = useState(Array.from({ length: 10 }).map(() => getRangeRandom(100, 300)));
  const msnry = useRef();
  const gridRef = useRef(null);
  function handleLoad() {
    const newData = Array.from({ length: loadNum }).map(() =>
      getRangeRandom(100, 300)
    );
    setData((prevData) => [...prevData, ...newData]);
  }
  useEffect(() => {
    msnry.current = new Masonry(gridRef.current, {
      itemSelector: '.grid-item',
      gutter: 10,
      columnWidth: 200,
    });
  }, []);
  useUpdateEffect(() => {
    // 新数据更新后，追加元素到 Masonry 布局中
    if (msnry.current) {
      const newItems = Array.from(
        gridRef.current?.querySelectorAll('.grid-item')
      ).slice(-loadNum); // 选择最后 loadNum 个元素
      msnry.current.appended(newItems);
    }
  }, [data]);
  return (
    <div>
      <div className="grid" ref={gridRef}>
        {
          data.map((v, index) => (
            <Item key={index} item={{ height: v }} index={index} />
          ))
        }
      </div>
      <Button type="primary" onClick={handleLoad}>loadMore</Button>
    </div>

  );
}