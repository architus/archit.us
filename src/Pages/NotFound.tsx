import React from "react";
import styled, { down, css } from "@xstyled/emotion";
import { Layout, AutoLink } from "Components";

const Styled = {
  Layout: styled.divBox`
    background-color: b_400;
    color: text;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    text-align: center;
  `,
  Content: styled.divBox`
    max-width: 360px;
    position: relative;
    z-index: 1;

    &::before,
    &::after {
      position: absolute;
      content: "";
      opacity: 0.2;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15'%3E%3Ccircle fill='%23777777' cx='1.5' cy='1.5' r='1.5'/%3E%3Cscript xmlns=''/%3E%3C/svg%3E");
    }

    &::before {
      top: 45px;
      bottom: -32px;
      left: 0;
      width: 130%;
      height: 100%;
      margin-left: -30%;
    }

    &::after {
      top: 100px;
      right: 0;
      width: 20%;
      height: 75%;
      margin-right: -30%;
    }

    h2 {
      font-size: 7rem;
      font-weight: 200;
      margin-bottom: pico;
      line-height: 1;

      ${down(
        "md",
        css`
          font-size: 4.5rem;
        `
      )}
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: micro;
    }

    p {
      color: text_fade;
      margin-bottom: pico;
    }
  `,
};

type NotFoundProps = {
  fromApp?: boolean;
};

const NotFound: React.FC<NotFoundProps> = ({ fromApp = false }) => (
  <Layout title="Not Found" noHeader={fromApp}>
    <Styled.Layout>
      <Styled.Content pt={{ xs: "milli", lg: "kilo" }} px="nano">
        <h2>404</h2>
        <h3>Page not found</h3>
        <p>
          The page you&apos;re looking for doesn&apos;t exist or was removed.
        </p>
        <p>
          If you feel this is in error, please file a new issue{" "}
          <AutoLink to="https://github.com/architus/archit.us/issues/new">
            on GitHub
          </AutoLink>
        </p>
      </Styled.Content>
    </Styled.Layout>
  </Layout>
);

export default NotFound;
