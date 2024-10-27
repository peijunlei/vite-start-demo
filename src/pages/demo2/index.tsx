
import { useEffect, useRef, useState } from 'react';
import { getRangeRandom } from '../../utils';
import { Button, Card, Divider, message, Skeleton } from 'antd';
import { useUpdateEffect } from 'ahooks';
import './index.scss'
import InfiniteScroll from 'react-infinite-scroll-component';



const loadNum = 5;
function mockData(count = loadNum) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({ length: count }).map(() => getRangeRandom(100, 300)))
    }, 1000)
  })
}
export default function Demo1() {
  const [data, setData] = useState([]);
  const msnry = useRef();
  const gridRef = useRef(null);

  async function loadMoreData() {
    const res = await mockData();
    setData((prevData) => [...prevData, ...res]);
  }

  async function init() {
    const res = await mockData(10);
    setData(res);
  }

  function refresh() {
    msnry.current = null
    init();
  }
  useEffect(() => {
    init();
  }, []);
  useUpdateEffect(() => {
    // 新数据更新后，追加元素到 Masonry 布局中
    if (data.length === 0) return
    if (!msnry.current) {
      msnry.current = new Masonry(gridRef.current, {
        itemSelector: '.grid-item',
        gutter: 10,
        columnWidth: 200,
      });
    } else {
      const newItems = Array.from(
        gridRef.current?.querySelectorAll('.grid-item')
      ).slice(-loadNum); // 选择最后 loadNum 个元素
      msnry.current.appended(newItems);
    }
  }, [data]);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        padding: 16,
        overflowY: 'auto',
        border: '1px solid #ccc',
      }}
    >

      <InfiniteScroll
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; 下拉刷新</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; 释放刷新</h3>
        }
        refreshFunction={refresh}
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 100}
        loader={<Skeleton paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>没有更多了</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <div
          className="grid"
          ref={gridRef}

        >
          {
            data.map((v, index) => (
              <Item key={index} item={{ height: v }} index={index} />
            ))
          }
        </div>
      </InfiniteScroll >
    </div >
  );
}
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