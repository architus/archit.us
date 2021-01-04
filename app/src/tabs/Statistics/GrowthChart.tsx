import React, { useMemo } from "react";
import { AreaChart, Area, XAxis, Tooltip } from "recharts";

import { CustomRechartsTooltip } from "./CustomRechartsTooltip";
import CustomResponsiveContainer from "./CustomResponsiveContainer";
import { Snowflake, Member } from "@app/utility/types";
import { formatNum } from "@architus/lib/utility";

type GrowthChartProps = {
  members: Map<Snowflake, Member>;
};

const tooltipRenderer = (
  payload: Array<{ value: number }>,
  label: string
): JSX.Element => {
  return (
    <>
      <p>
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }).format(new Date(label ?? 0))}
      </p>
      {formatNum(payload.length > 0 ? payload[0].value : 0)} members
    </>
  );
};

const dateFormatter = (tick: string): string => {
  const options = { month: "short", day: "numeric" };
  return new Date(tick).toLocaleDateString("en-US", options);
};

type GrowthDataPoint = {
  count: number;
  date: number;
};

// Creates bin number from year/month/day
const packBin = (year: number, month: number, day: number): number =>
  year * 500 + month * 40 + day;
// Creates Unix timestamp from year/month/day
const unpackBin = (bin: number): number =>
  new Date(
    Math.floor(bin / 500),
    Math.floor((bin % 500) / 40),
    (bin % 500) % 40
  ).getTime();

export const GrowthChart: React.FC<GrowthChartProps> = ({ members }) => {
  const data = useMemo<GrowthDataPoint[]>(() => {
    if (members.size === 0) {
      return [];
    }

    // Find the date range of the dataset
    let minJoinedAt: null | number = null;
    let maxJoinedAt: null | number = null;
    members.forEach(({ joined_at: joinedAt }) => {
      minJoinedAt = Math.min(minJoinedAt ?? joinedAt, joinedAt);
      maxJoinedAt = Math.max(maxJoinedAt ?? joinedAt, joinedAt);
    });
    const range = (maxJoinedAt ?? 0) - (minJoinedAt ?? 0);

    // Determine the adaptive bin width,
    // and pack the year/month/day of the start of the bin into a single number
    // Additionally, add a zero bin at the beginning of the guild's history
    let toBin: (day: Date) => number;
    let makeZeroBin: (day: Date) => number;
    if (range <= 2_419_200_000) {
      // range <= 4 weeks as milliseconds: bin by day
      // use arbitrary numbers to avoid collisions
      toBin = (day: Date): number =>
        packBin(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate());
      makeZeroBin = (firstTimestamp: Date): number => {
        firstTimestamp.setDate(firstTimestamp.getDate() - 1);
        return toBin(firstTimestamp);
      };
    } else if (range <= 10_368_000_000) {
      // range <= 4 months as milliseconds: bin by week
      toBin = (day: Date): number =>
        packBin(
          day.getUTCFullYear(),
          day.getUTCMonth(),
          // Create 1-based day-of-month for the start of the week bin
          Math.floor((day.getUTCDate() - 1) / 7) * 7 + 1
        );
      makeZeroBin = (firstTimestamp: Date): number => {
        firstTimestamp.setDate(firstTimestamp.getDate() - 7);
        return toBin(firstTimestamp);
      };
    } else {
      // bin by month
      toBin = (day: Date): number =>
        // The start of the bin is always the start of the month
        packBin(day.getUTCFullYear(), day.getUTCMonth(), 1);
      makeZeroBin = (firstTimestamp: Date): number => {
        firstTimestamp.setMonth(firstTimestamp.getMonth() - 1);
        return toBin(firstTimestamp);
      };
    }

    // Bin the data points by the adaptive bin width
    const memberBins = new Map();
    members.forEach(({ joined_at: joinedAt }) => {
      const joinedBin = toBin(new Date(joinedAt));
      memberBins.set(joinedBin, (memberBins.get(joinedBin) ?? 0) + 1);
    });

    // Create an unsorted list of data points
    const dataPoints: GrowthDataPoint[] = [];
    memberBins.forEach((count, bin) => {
      dataPoints.push({ count, date: unpackBin(bin) });
    });

    // Add the zero bin-value
    const zeroDate = unpackBin(makeZeroBin(new Date(minJoinedAt ?? 0)));
    dataPoints.push({ count: 0, date: zeroDate });

    // Sort the data points by date
    dataPoints.sort((a, b) => a.date - b.date);

    // Aggregate the data points in-place
    let total = 0;
    dataPoints.forEach((dataPoint) => {
      total += dataPoint.count;
      // eslint-disable-next-line no-param-reassign
      dataPoint.count = total;
    });

    return dataPoints;
  }, [members]);

  return (
    <CustomResponsiveContainer>
      <AreaChart data={data}>
        <XAxis
          dataKey="date"
          tickFormatter={dateFormatter}
          type={"number"}
          scale={"time"}
          domain={["dataMin", "dataMax"]}
        />
        <Area type="monotone" dataKey="count" stroke="#5850ba" fill="#5850ba" />
        <Tooltip
          content={<CustomRechartsTooltip renderer={tooltipRenderer} />}
        />
      </AreaChart>
    </CustomResponsiveContainer>
  );
};
