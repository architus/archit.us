import { styled } from "linaria/react";
import { lighten } from "polished";
import React from "react";

import {
  color,
  mode,
  ColorMode,
  dynamicColor,
  staticColor,
} from "@architus/facade/theme/color";
import { down } from "@architus/facade/theme/media";
import { shadow } from "@architus/facade/theme/shadow";
import { isDefined, splitFragments } from "@architus/lib/utility";
import { useApiVersions } from "@docs/data/api-versions";

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

export type RestRouteProps = {
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
  const { rest: restVersion } = useApiVersions();
  const derivedVersion = isDefined(version)
    ? version
    : restVersion.getOrElse("Unversioned");
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
