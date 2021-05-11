import React, { useState } from "react";
import { Section, Item } from "@react-stately/collections";
import Menu from "./components/menu";
import "./components/menu.css";
import logo from "./assets/imgs/logo.svg";

export default function Root(props) {
  const disabledKeys = [];
  const [selectedKey, setSelectedKey] = useState("");
  const onAction = (key) => {
    setSelectedKey(key);
  };
  return (
    <div class="micro-layout-sider">
      <aside class="micro-sider micro-sider-fixed">
        <div class="micro-logo">
          <a href="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </a>
        </div>
        <Menu
          onAction={onAction}
          selectedKey={selectedKey}
          aria-label="Actions"
          disabledKeys={disabledKeys}
        >
          <Section title="Dashboard">
            <Item key="one">分析页</Item>
            <Item key="two">监控页</Item>
            <Item key="three">工作台</Item>
          </Section>
        </Menu>
      </aside>
    </div>
  );
}
