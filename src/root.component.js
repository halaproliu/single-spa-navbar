import React, { useState } from "react";
import { Section, Item } from "@react-stately/collections";
import Menu from "./components/menu";
import "./components/menu.css";
import logo from "./assets/imgs/logo.svg";

export default function Root() {
  const disabledKeys = [];
  const expandedKeys = new Set();
  expandedKeys.add("Dashboard");
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
          expandedKeys={expandedKeys}
        >
          <Section title="Dashboard" key="Dashboard">
            <Item key="one">分析页</Item>
            <Item key="two">监控页</Item>
            <Item key="three">工作台</Item>
          </Section>
          <Section title="Dashboard1" key="Dashboard1">
            <Item key="one1">分析页</Item>
            <Item key="two1">监控页</Item>
            <Item key="three1">工作台</Item>
          </Section>
        </Menu>
      </aside>
    </div>
  );
}
