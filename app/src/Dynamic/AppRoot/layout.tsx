import React from "react";
import classNames from "classnames";
import { Layout } from "Components";

type AppLayoutProps = {
  children: React.ReactNode;
  className?: string;
} & Partial<React.HTMLAttributes<HTMLElement>>;

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <Layout
      title="Web Dashboard"
      className="app-root"
      noContainer
      noLinks
      sticky={false}
    >
      <div className={classNames(className, "content-container")} {...rest}>
        {children}
      </div>
    </Layout>
  );
};

export default AppLayout;
