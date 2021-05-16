import React from "react";
import { useTreeState } from "@react-stately/tree";
import { useFocus } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { useMenu, useMenuItem, useMenuSection } from "@react-aria/menu";
import { DashboardOutlined } from "@ant-design/icons";

export default function Menu(props) {
  let state = useTreeState({ ...props, selectionMode: "none" });

  let ref = React.useRef();
  let { menuProps } = useMenu(props, state, ref);
  let { selectedKey } = props;

  return (
    <ul
      {...menuProps}
      ref={ref}
      style={{
        padding: 0,
        listStyle: "none",
        maxWidth: 250,
        position: "relative",
        zIndex: 10,
        margin: 0,
      }}
    >
      {[...state.collection].map((item) => (
        <MenuSection
          key={item.key}
          section={item}
          state={state}
          onAction={props.onAction}
        />
      ))}
    </ul>
  );

  function MenuSection({ section, state, onAction }) {
    let { itemProps, headingProps, groupProps } = useMenuSection({
      heading: section.rendered,
      "aria-label": section["aria-label"],
    });

    let onItemAction = (key) => {
      state.selectionManager.extendSelection(key);
      onAction(key);
    };

    // If the section is not the first, add a separator element.
    // The heading is rendered inside an <li> element, which contains
    // a <ul> with the child items.
    return (
      <>
        {/* {section.key !== state.collection.getFirstKey() && (
          <li
            {...separatorProps}
            style={{
              borderTop: "1px solid gray",
              margin: "2px 5px",
            }}
          />
        )} */}
        <li {...itemProps}>
          {section.rendered && (
            <div {...headingProps} className="micro-menu-submenu-title">
              <span className="micro-menu-item" title={section.key}>
                <DashboardOutlined
                  className="microicon microicon-dashboard"
                  style={{
                    color: "#fff",
                    marginRight: 10,
                    minWidth: 14,
                    fontSize: 14,
                  }}
                />
                <span className="micro-menu-item-title">
                  {section.rendered}
                </span>
              </span>
              <i
                className="fa fa-angle-up micro-menu-submenu-arrow"
                aria-hidden="true"
              ></i>
              {/* {
                openKeys.has(section.key) ? (<i
                  className="fa fa-angle-up micro-menu-submenu-arrow"
                  aria-hidden="true"
                ></i>) : (<i
                  className="fa fa-angle-down micro-menu-submenu-arrow"
                  aria-hidden="true"
                ></i>)
              } */}
            </div>
          )}
          <ul
            {...groupProps}
            style={{
              padding: 0,
              listStyle: "none",
            }}
          >
            {[...section.childNodes].map((node) => (
              <MenuItem
                key={node.key}
                item={node}
                state={state}
                onAction={onItemAction}
              />
            ))}
          </ul>
        </li>
      </>
    );
  }

  function MenuItem({ item, state, onAction }) {
    // Get props for the menu item element
    let ref = React.useRef();
    let isDisabled = state.disabledKeys.has(item.key);

    let { menuItemProps } = useMenuItem(
      {
        key: item.key,
        isDisabled,
        onAction,
      },
      state,
      ref
    );

    // Handle focus events so we can apply highlighted
    // style to the focused menu item
    let [isFocused, setFocused] = React.useState(false);
    let { focusProps } = useFocus({ onFocusChange: setFocused });

    return (
      <li
        {...mergeProps(menuItemProps, focusProps)}
        ref={ref}
        className={
          selectedKey === item.key
            ? "micro-menu-submenu micro-menu-submenu-selected"
            : "micro-menu-submenu"
        }
        style={{
          cursor: isDisabled ? "default" : "pointer",
        }}
      >
        {item.rendered}
      </li>
    );
  }
}
