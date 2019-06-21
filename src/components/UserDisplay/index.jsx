import React from "react";
import PlaceholderContent from "../PlaceholderContent";

function UserDisplay() {
  return (
    <div className="mr-2 d-inline-block">
      <PlaceholderContent
        inline
        width={40}
        className="align-middle mr-2"
        shape="circle"
      />
      <PlaceholderContent inline width={120} className="align-middle" />
    </div>
  );
}

export default UserDisplay;
