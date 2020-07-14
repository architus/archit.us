import React from "react";
import { styled } from "linaria/react";

import { useApiVersions } from "@docs/data/apiVersions";
import { isDefined, splitFragments } from "@lib/utility";
import {
  color,
  down,
  mode,
  ColorMode,
  shadow,
  staticColor,
  dynamicColor,
} from "@design/theme";
import { lighten } from "polished";

const PathParamRegex = /{[^{}]+}/g;

const Styled = {
  RestfulRoute: styled.div`
    font-weight: 400;
  `,
  Header: styled.h3`
    border: 1px solid ${color("contrastBorder")};
    background-color: ${color("bg+20")};

    ${mode(ColorMode.Dark)} {
      box-shadow: ${shadow("z1")};
    }

    margin-top: 0 !important;
    margin-bottom: 0.15rem;
    display: inline-block;
    border-radius: 4px;
    font-size: 1.2rem !important;
  `,
  Version: styled.span`
    color: ${color("textLight")};
    font-size: 0.9rem;
    font-weight: 500;
    display: block;
    margin-bottom: 0.35rem;
  `,
  Method: styled.span`
    border-right: 1px solid ${color("contrastBorder")};

    ${mode(ColorMode.Dark)} {
      background-color: ${lighten(0.05, dynamicColor("bg+20", ColorMode.Dark))};
      color: ${lighten(0.02, staticColor("success"))};
    }

    ${mode(ColorMode.Light)} {
      background-color: ${color("bg")};
      color: ${color("success")};
    }

    padding: 0.5rem 0.8rem 0.45rem 0.7rem;
    display: inline-block;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  `,
  Path: styled.span`
    color: ${color("textFade")};
    margin-left: 0.2rem;
    padding: 0.5rem 0.6rem 0.45rem;
    display: inline-block;

    ${down("sm")} {
      display: inline-flex;
      flex-direction: column;
    }
  `,
  Auth: styled.span`
    display: block;
    font-size: 0.95rem;
    margin-top: 0.2rem;
    font-weight: 500;
    color: ${color("primary")};
  `,
  PathParam: styled.span`
    color: ${color("textStrong")};
  `,
  PathSegment: styled.span`
    opacity: 0.8;
  `,
};

type RestRouteProps = {
  method: string;
  path: string;
  auth?: boolean;
  version?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * API route display used for HTTP routes in the Rest API
 */
const RestRoute: React.FC<RestRouteProps> = ({
  method,
  path,
  auth = false,
  version,
  className,
  style,
}) => {
  const { restVersion } = useApiVersions();
  const derivedVersion = isDefined(version) ? version : restVersion;
  return (
    <Styled.RestfulRoute className={className} style={style}>
      <Styled.Version>{derivedVersion}</Styled.Version>
      <Styled.Header>
        <Styled.Method>{method}</Styled.Method>
        <Styled.Path>
          {splitFragments(path, PathParamRegex).map((fragment) =>
            PathParamRegex.test(fragment) ? (
              <Styled.PathParam key={fragment}>{fragment}</Styled.PathParam>
            ) : (
              <Styled.PathSegment key={fragment}>{fragment}</Styled.PathSegment>
            )
          )}
        </Styled.Path>
      </Styled.Header>
      {auth ? <Styled.Auth>Requires authentication</Styled.Auth> : null}
    </Styled.RestfulRoute>
  );
};

export default RestRoute;
