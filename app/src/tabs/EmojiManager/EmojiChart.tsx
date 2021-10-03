import { styled } from "linaria/react";
import React from "react";

import HelpTooltip from "@app/components/HelpTooltip";
import Switch from "@app/components/Switch";
import { sitePadding } from "@app/layout";
import { StylableButton } from "@architus/facade/components/Button";
import Tooltip from "@architus/facade/components/Tooltip";
import Comfy from "@architus/facade/icons/comfy.svg";
import Compact from "@architus/facade/icons/compact.svg";
import Sparse from "@architus/facade/icons/sparse.svg";
import { color } from "@architus/facade/theme/color";
import { up } from "@architus/facade/theme/media";
import { shadow } from "@architus/facade/theme/shadow";
import { gap } from "@architus/facade/theme/spacing";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const Styled = {

};

export type EmojiChartProps = {

};


const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#5850ba', '#844ea3', '#ba5095', '#ffbfa7'];

/**
 * Pie chart for displaying emoji manager usage stats
 */
const EmojiChart: React.FC<EmojiChartProps> = React.memo(({

}) => (
  <div style={{'width': '100px'}}>
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          //cx={420}
          cy={38}
          startAngle={180}
          endAngle={0}
          innerRadius={25}
          outerRadius={43}
          //fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
));

export default EmojiChart;
