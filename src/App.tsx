import { Router } from "./routes";

import mitt from "./kit/mitt";
import { useEffect } from "react";
import { message } from "antd";
export default function App() {

  useEffect(() => {
    mitt.once("app-tip", (title: string) => {
      message.info(title)
    });
  }, []);
  return (
    <Router />
  );
}
