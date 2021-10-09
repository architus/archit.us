import { styled } from "linaria/react";
import React from "react";

import HelpTooltip from "@app/components/HelpTooltip";
import Switch from "@app/components/Switch";
import { sitePadding } from "@app/layout";
import { StylableButton } from "@architus/facade/components/Button";
import Comfy from "@architus/facade/icons/comfy.svg";
import Compact from "@architus/facade/icons/compact.svg";
import Sparse from "@architus/facade/icons/sparse.svg";
import { color } from "@architus/facade/theme/color";
import { down, up } from "@architus/facade/theme/media";
import { shadow } from "@architus/facade/theme/shadow";
import { gap } from "@architus/facade/theme/spacing";
import { Bar, BarChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { load } from "src/store/actions";
import { CustomRechartsTooltip } from "../Statistics/CustomRechartsTooltip";
import { transition } from "@architus/facade/theme/motion";

const Styled = {
  Outer: styled.div`
    //width: 100%;
    //height: 100px;
    //display: flex;
    justify-content: center;
    align-items: center;
    //margin-bottom: ${gap.nano};
    margin-top: -5px;
    //padding-right: 58px;
    ${up("md")} {
      margin-left: calc(${gap.milli} - 5px);
      margin-right: calc(${gap.milli} - 5px);
    }

    ${down("md")} {
      border-radius: 0;
    }
  `,
  Bar: styled.div`
    height: 100%;
    width: 100%;
    padding: 0 ${gap.milli};
    background-color: ${color('bg-10')};
    border-radius: 0 0 10px 10px;
    //margin: 0 ${gap('nano')} ${gap('milli')} ${gap('milli')};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    //padding: 27px 20px 0px 20px;
    padding: 0;
  `,
  TooltipContainer: styled.div`
    background-color: ${color("tooltip")};
    border: 1px solid ${color("tooltip")};
    box-shadow: ${shadow("z3")};
    border-radius: 4px;
    display: flex;
    color: ${color("light")};
    flex-direction: column;
    ${transition(["opacity"])}
    font-size: 0.9rem;
    padding: 10px;
    z-index: 100;
    position: relative;
  `,
};

const tooltipRenderer = (
  payload: Array<{ current: number }>,
  label: string
): JSX.Element => {
  if (payload.length === 0) return <></>;
  return (
    <>
      <p>yep</p>
    </>
  );
};



export type EmojiChartProps = {
  current: number,
  loaded: number,
  limit: number | 'unlimited',
  discordLimit: number,
};



const COLORS = ['#5850ba', '#844ea3', '#ba5095', '#ffbfa7'];

/**
 * Pie chart for displaying emoji manager usage stats
 */
const EmojiChart: React.FC<EmojiChartProps> = React.memo(({
  current, loaded, limit, discordLimit
}) => {
  var tooltip: string;
  const CustomTooltip = ({ active, payload }) => {
      if (!active || !tooltip)    return null
      for (const bar of payload)
          if (bar.dataKey === tooltip)
              return <Styled.TooltipContainer>{ bar.name }<br/>{ bar.value }<br/>{((loaded / discordLimit) * 100).toFixed(1)}% of discord capacity <br/>{capacity}% of architus capacity</Styled.TooltipContainer>
      return null
  }
  const architusLimit = limit === 'unlimited' ? Math.round(current / 50) * 50 + 50 : limit;
  const capacity = limit === 'unlimited' ? 0 : ((current / architusLimit) * 100).toFixed(1);
  const data = [
    {
      name: 'Page A',
      loaded: loaded,
      cached: current - loaded,
      free: architusLimit - current
    },

  ];

  return (
    <Styled.Outer>

      <ResponsiveContainer height={50}>
        <BarChart
          barGap={0}
          barCategoryGap={0}
          layout='vertical'
          data={data}>
          <XAxis
          axisLine={false}
            type="number"
           
            ticks={[discordLimit, architusLimit]}
            //tickFormatter={(tick) => tick === discordLimit ? "Discord Limit (50)" : "Architus Limit (200)"}
            scale="linear"
             />
          <ReferenceLine x={discordLimit} fill={color('bg+10')} />
          <ReferenceLine x={architusLimit} fill={color('bg+10')} />
          <YAxis dataKey="name" type="category" hide />
          <Tooltip wrapperStyle={{zIndex: 100}} content={<CustomTooltip/>} isAnimationActive={false}/>
          <Bar dataKey="loaded" stackId={0} fill={COLORS[0]} radius={[0, 0, 0, 10]} name="Loaded" onMouseOver={ () => tooltip="loaded" }/>
          <Bar dataKey="cached" stackId={0} fill={COLORS[2]} opacity={0.85} name="Cached" onMouseOver={ () => tooltip="cached" }/>
          <Bar dataKey="free" stackId={0} fill={color('bg-20')} opacity={0.85} radius={[0, 0, 10, current === 0 ? 10 : 0]} name="Free" onMouseOver={ () => tooltip="free" }/>
        </BarChart>
      </ResponsiveContainer>
    </Styled.Outer>
  );
});

export default EmojiChart;
