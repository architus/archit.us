import classNames from "classnames";
import React from "react";

import Layout from "@app/components/Layout";

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
      seo={{ title: "Web Dashboard" }}
      className="app-root"
      noContainer
      noLinks
    >
      <div className={classNames(className, "content-container")} {...rest}>
        {children}
      </div>
    </Layout>
  );
};

export default AppLayout;
