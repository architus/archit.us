import React from "react";
import { ResponsiveContainer } from "recharts";

// From https://github.com/recharts/recharts/issues/1767#issuecomment-598607012
const CustomResponsiveContainer: React.FC<React.ComponentProps<
  typeof ResponsiveContainer
>> = (props) => (
  <div style={{ width: "100%", height: "100%", position: "relative" }}>
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <ResponsiveContainer {...props} />
    </div>
  </div>
);

export default CustomResponsiveContainer;
