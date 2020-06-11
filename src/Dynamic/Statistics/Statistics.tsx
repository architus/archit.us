import React from "react";
import styled, { css, up, Box } from "@xstyled/emotion";
import { ColorMode, opacity, color, mode } from "Theme";
import { Card, Icon } from "Components";
import { Badge, Image } from "react-bootstrap";
import CountUp from "react-countup";
import { AppPageProps } from "Dynamic/AppRoot/types";

const Styled = {
  PageOuter: styled.div`
    position: relative;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex-direction: column;
    height: 100%;

    padding-top: milli;
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
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
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
  `,
  Description: styled.p`
    margin-bottom: 0;
    font-size: 0.9em;
    margin-top: -pico;
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
      <Styled.Card>
        <Styled.CountUp end={333} duration={5} />
      </Styled.Card>
      <Styled.Card>
        <Image
          src="https://cdn.archit.us/assets/695011369632403465.png"
          rounded
        />
      </Styled.Card>
      <Styled.Card>
        <Styled.CountUp end={2} duration={5} />
      </Styled.Card>
    </Styled.CardContainer>
  </Styled.PageOuter>

);

export default Statistics;
