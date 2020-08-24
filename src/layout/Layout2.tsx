import React from "react";
import useScreenSize, { ScreenSize } from "./useScreenSize";

interface Layout2Prop {
  children: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const LargeLayout2 = (props: Layout2Prop) => {
  return (
    <div className="content">
      {props.left && (
        <div className="container container-left">{props.left}</div>
      )}
      <div className="container">{props.children}</div>
      {props.right && (
        <div className="container container-right">{props.right}</div>
      )}
    </div>
  );
};
const SmallLayout2 = (props: Layout2Prop) => {
  return (
    <>
      <div className="content">
        {props.left && <div className="container">{props.left}</div>}
      </div>
      <div className="content">
        <div className="container">{props.children}</div>
      </div>
      <div className="content">
        {props.right && <div className="container">{props.right}</div>}
      </div>
    </>
  );
};

export const Layout2 = (props: Layout2Prop) => {
  const size = useScreenSize();
  if (size === ScreenSize.LARGE) return <LargeLayout2 {...props} />;
  return <SmallLayout2 {...props} />;
};
