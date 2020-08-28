import React from "react";
import useScreenSize, { ScreenSize } from "./useScreenSize";
import { Button, Drawer, Position } from "@blueprintjs/core";

interface Layout2Prop {
  children: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const LargeLeftLayout = ({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) => {
  const [show, setShow] = React.useState<boolean>(true);
  if (show) {
    return (
      <>
        <div className="container container-left">{children}</div>;
        <div style={{ position: "relative" }}>
          <Button
            style={{ position: "absolute", right: 20, bottom: 0 }}
            icon="chevron-left"
            onClick={() => setShow(false)}
          />
        </div>
      </>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <Button
        style={{ position: "absolute", right: -30, bottom: 0 }}
        icon="chevron-right"
        onClick={() => setShow(true)}
      />
    </div>
  );
};

const LargeLayout2 = (props: Layout2Prop) => {
  return (
    <div className="content">
      {props.left && <LargeLeftLayout>{props.left}</LargeLeftLayout>}
      <div className="container">{props.children}</div>
      {props.right && (
        <div className="container container-right">{props.right}</div>
      )}
    </div>
  );
};
const SmallLayout2 = (props: Layout2Prop) => {
  const [show, setShow] = React.useState<boolean>();
  return (
    <>
      <div className="content">
        {props.left && (
          <>
            <div className="container container-top">
              <Button icon="menu" onClick={() => setShow((show) => !show)} />
            </div>

            <Drawer isOpen={show} position={Position.LEFT}>
              {props.left}
            </Drawer>
          </>
        )}
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
