
import { useEffect, useRef, useState } from 'react';
import { getRangeRandom } from '../../utils';
import { Button, Card, message } from 'antd';
import { useUpdateEffect } from 'ahooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import defaultImage from '../../assets/image-default.png';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './index.scss'

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
        width: 200,
        minWidth: 200,
        minHeight: 200,
        marginBottom: 10,
        borderColor: '#ccc',
      }}
      onClick={() => {
        message.success(`click${index + 1}`,)
      }}
    >
      <LazyLoadImage
        effect="blur"
        placeholderSrc={defaultImage}
        onLoad={handleImageLoad}
        src={item.src}
        alt=""
        style={{ width: '100%' }}
      />
    </Card>
  )
}
const loadNum = 5;
export default function Demo1() {
  const [data, setData] = useState(generateImages(10));
  const msnry = useRef();
  const imgLoad = useRef();
  const gridRef = useRef(null);

  function layout() {
    if (msnry.current) {
      msnry.current.layout();
    }
  }
  function handleLoad() {
    const newData = generateImages(loadNum);
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
      <Button type="primary" onClick={handleLoad}>loadMore</Button>

      <div className="grid" ref={gridRef}>
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
    </div>

  );
}