
import { Card, Flex } from "antd";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Flex
      wrap="wrap"
      gap={10}
    >
      <Card
        hoverable
        title="瀑布流"
        extra={<Link to='demo1' >link</Link>}
      >
        点击加载更多
      </Card>
      <Card
        hoverable
        title="瀑布流-图片懒加载"
        extra={<Link to='demo5' >link</Link>}
      >
        点击加载更多
      </Card>
      <Card
        hoverable
        title="瀑布流-无限加载"
        extra={<Link to='demo2' >link</Link>}
      >
        滚动到底自动加载
      </Card>
      <Card
        hoverable
        title="拖拽排序1"
        extra={<Link to='demo3' >link</Link>}
      >
        拖拽排序1-react-sortable-hoc
      </Card>
      <Card
        hoverable
        title="demo4"
        extra={<Link to='demo4' >link</Link>}
      >
       demo4
      </Card>
    </Flex>
  );
}