import { action } from "@storybook/addon-actions";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

import ErrorBoundary from "./ErrorBoundary";
import { useCallbackOnce } from "@app/utility";

export default {
  title: "@app/components|ErrorBoundary",
  parameters: {
    component: ErrorBoundary,
  },
};

export const SilentHandling = () => {
  const [causeError, setCauseError] = useState(false);
  const [key, setKey] = useState(0);
  const onClick = useCallbackOnce(() => setCauseError(true));
  const onClickReset = useCallbackOnce(() => {
    setCauseError(false);
    setKey((key) => key + 1);
  });

  return (
    <>
      <h4>Outer component (remains intact)</h4>
      <Button variant="primary" onClick={onClickReset} className="mb-2">
        Reset
      </Button>
      <div>
        <ErrorBoundary onError={action("inner-error")} key={key}>
          <Button variant="danger" onClick={onClick}>
            Throw Error
          </Button>
          {causeError ? <CausesError /> : null}
        </ErrorBoundary>
      </div>
    </>
  );
};
SilentHandling.story = {
  parameters: {
    notes:
      "See the [React documentation on the subject](https://reactjs.org/docs/error-boundaries.html)",
  },
};

export const Fallback = () => {
  const [causeError, setCauseError] = useState(false);
  const [key, setKey] = useState(0);
  const onClick = useCallbackOnce(() => setCauseError(true));
  const onClickReset = useCallbackOnce(() => {
    setCauseError(false);
    setKey((key) => key + 1);
  });

  return (
    <>
      <h4>Outer component (remains intact)</h4>
      <Button variant="primary" onClick={onClickReset} className="mb-2">
        Reset
      </Button>
      <div>
        <ErrorBoundary
          key={key}
          onError={action("inner-error")}
          fallback={<p>An error ocurred within the render tree</p>}
        >
          <Button variant="danger" onClick={onClick}>
            Throw Error
          </Button>
          {causeError ? <CausesError /> : null}
        </ErrorBoundary>
      </div>
    </>
  );
};

function CausesError() {
  throw Error("Error caused in render tree");
}
