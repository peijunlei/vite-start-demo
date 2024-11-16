
import { useEffect, useRef, useState } from 'react';
import { getRangeRandom } from '../../utils';
import { Button, Card, Divider, message, Skeleton } from 'antd';
import { useUpdateEffect } from 'ahooks';
import InfiniteScroll from 'react-infinite-scroll-component';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import defaultImage from '../../assets/image-default.png';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './index.scss'
const loadNum = 10;
const columnWidth = 400;
function generateImages(count = 10) {
  return Array.from({ length: count }).map(() => `
    https://picsum.photos/200/${getRangeRandom(200, 400)}
    `);
}
const Item = (props: {
  item: any,
  layout: () => void,
  index: number
}) => {
  const { item, index, layout } = props;
  const handleImageLoad = () => {
    console.log('image loaded');
    layout()
  };

  return (
    <Card
      hoverable
      className="grid-item"
      style={{
        width: columnWidth,
        marginBottom: 10,
        borderColor: '#ccc',
      }}
      onClick={() => {
        message.success(`click${index + 1}`,)
      }}
    >
      <LazyLoadImage
        // effect="blur"
        placeholderSrc={defaultImage}
        onLoad={handleImageLoad}
        src={item.src}
        wrapperClassName='item-bg'
        alt=""
        style={{ width: '100%' }}
      />
    </Card>
  )
}

function mockData(count = loadNum) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateImages(count));
    }, 1000)
  })
}
export default function Demo1() {
  const [data, setData] = useState([]);
  const msnry = useRef();
  const gridRef = useRef(null);
  function layout() {
    if (msnry.current) {
      msnry.current.layout();
    }
  }
  async function loadMoreData() {
    const res = await mockData();
    setData((prevData) => [...prevData, ...res]);
  }

  async function init() {
    const res = await mockData(30);
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
        columnWidth: columnWidth,
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
        height: '100%',
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
              <Item
                key={index}
                layout={layout}
                item={{ src: v }}
                index={index}

              />
            ))
          }
        </div>
      </InfiniteScroll >
    </div >
  );
}