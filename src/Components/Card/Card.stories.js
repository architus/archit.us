import React from "react";
import Card from "./index";
import { boolean, text } from "@storybook/addon-knobs";
import MaxWidthDecorator from "MaxWidthDecorator";

import Icon from "Components/Icon";
import { Button } from "react-bootstrap";

export default {
  title: "Components/Card",
  decorators: [MaxWidthDecorator],
  parameters: { component: Card },
};

export const Basic = () => {
  const hasTitle = boolean("Show Title", true);
  const title = text("Header", "Card Title");
  return (
    <Card
      header={hasTitle ? title : null}
      children={text(
        "Body",
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quam tortor, commodo non porttitor vel, ultrices in nisi. Curabitur porttitor, lorem in iaculis vestibulum, leo mauris vehicula felis, in laoreet ligula nisi fermentum neque. Nunc rhoncus semper enim nec laoreet.`
      )}
    />
  );
};

export const AdvancedContent = () => {
  const hasTitle = boolean("Show Title", true);
  const title = (
    <>
      <Icon name="shield-alt" className="mr-2" />
      Card Title
    </>
  );
  return (
    <Card
      header={hasTitle ? title : null}
      children={
        <>
          <p>
            Sed id mollis nisi, eu rhoncus arcu. Curabitur ut molestie mi.
            Aliquam porttitor nibh ut accumsan iaculis. Nullam lacinia magna a
            efficitur lobortis. Curabitur mattis ante sit amet imperdiet
            euismod.
          </p>
          <Button variant="primary" className="mb-1">
            Do Something
          </Button>
        </>
      }
    />
  );
};
