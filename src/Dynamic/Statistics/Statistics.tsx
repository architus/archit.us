import React from "react";
import styled, { css, up, Box } from "@xstyled/emotion";
import { ColorMode, opacity, color, mode } from "Theme";
import { Card, Icon } from "Components";
import { Badge, Image } from "react-bootstrap";
import CountUp from "react-countup";
import { AppPageProps } from "Dynamic/AppRoot/types";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const Styled = {
  PageOuter: styled.div`
    position: relative;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex-direction: column;
    height: 100%;

    padding-top: milli;
    padding-left: micro;
  `,
  CircledIcon: styled(Icon)`
    background: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    vertical-align: middle;
    padding: 0px;
  `,
  Icon: styled(Icon)`
    font-size: 2em;
    color: light;
    padding: 0px 20px;
  `,
  HeaderCards: styled.div`
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    flex-direction: row;
  `,
  CardContainer: styled.div`
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
    grid-auto-rows: 200px;
    grid-auto-flow: dense;
    gap: 10px;
    justify-items: stretch;
  `,
  ContentContainer: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
  `,
  LabelContainer: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: nano;
    color: light;
  `,
  Description: styled.p`
    margin-bottom: 0;
    font-size: 0.9em;
    margin-top: -pico;
    color: light !important;
  `,
  MessageCard: styled(Card.Plain)`
    margin: 10px;
    width: 100%;
    border: none;
    background-color: #5850ba;
    background-image: linear-gradient(62deg, #5850ba 0%, #844ea3 100%);
    padding: 16px 34px;

  `,
  HeaderCard: styled(Card.Plain)`
    margin: 10px;
    width: 100%;
    border: none;
    padding: 16px;
    background-color: #ba5095;
    background-image: linear-gradient(62deg, #ba5095 0%, #ffbfa7 100%);
  `,
  MemberCard: styled(Card.Plain)`
    margin: 10px;
    width: 100%;
    border: none;
    padding: 16px;
    background-color: #844ea3;
    background-image: linear-gradient(62deg, #844ea3 0%, #ba5095 100%);
  `,
  Card: styled(Card.base)`
    margin: 5px;
    grid-column: span auto;
    grid-row: span auto;
  `,
  BigCard: styled(Card.base)`
    margin: 5px;
    grid-column: span 2;
    grid-row: span 2;
  `,
  Image: styled(Image)`
    max-height: 100%;
    max-width: 100%;
  `,
  CountUp: styled(CountUp)`
    font-size: 2.5em;
  `,
};

const Statistics: React.FC<AppPageProps> = () => (
  <Styled.PageOuter>
    <h2>
      Statistics <Badge variant="primary">Coming Soon</Badge>
    </h2>
    <Styled.HeaderCards>
      <Styled.MessageCard>
        <Styled.ContentContainer>
          <Styled.Icon name="comments" noAutoWidth />
          <Styled.LabelContainer>
            <Styled.CountUp end={2301793} duration={5} />
            <Styled.Description>Messages Sent</Styled.Description>
          </Styled.LabelContainer>
        </Styled.ContentContainer>
      </Styled.MessageCard>
      <Styled.MemberCard>
        <Styled.ContentContainer>
          <Styled.Icon name="users" noAutoWidth />
          <Styled.LabelContainer>
            <Styled.CountUp end={207} duration={5} />
            <Styled.Description>Members</Styled.Description>
          </Styled.LabelContainer>
        </Styled.ContentContainer>
      </Styled.MemberCard>
      <Styled.HeaderCard>
        <Styled.ContentContainer>
          <Styled.Icon name="history" noAutoWidth />
          <Styled.LabelContainer>
            <div>
              <Styled.CountUp end={2} duration={5} /> <sub>min</sub>
            </div>
            <Styled.Description>Last Activity</Styled.Description>
          </Styled.LabelContainer>
        </Styled.ContentContainer>
      </Styled.HeaderCard>
    </Styled.HeaderCards>
    <Styled.CardContainer>
      <Styled.Card>
        <Image src="https://cdn.discordapp.com/emojis/482104551902806016.png?v=1" />
      </Styled.Card>
      <Styled.Card>
        <Image
          src="https://cdn.discordapp.com/emojis/671530198352789524.png"
          roundedCircle
        />
      </Styled.Card>
      <Styled.Card>
        <Image
          src="https://cdn.discordapp.com/emojis/671530198352789524.png"
          rounded
        />
      </Styled.Card>
      <Styled.Card>
        <Styled.CountUp end={206} duration={5} />
      </Styled.Card>
      <Styled.Card>
        <Styled.CountUp end={7} duration={5} />
      </Styled.Card>
      <Styled.Card>
        <Styled.CountUp end={1289123} duration={5} />
      </Styled.Card>
      <Styled.BigCard>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </Styled.BigCard>
      <Styled.BigCard>
        <Styled.Image
          src="https://cdn.archit.us/assets/695011369632403465.png"
          rounded
        />
      </Styled.BigCard>
      <Styled.Card>
        <Styled.CountUp end={2} duration={5} />
      </Styled.Card>
    </Styled.CardContainer>
  </Styled.PageOuter>
);

export default Statistics;
