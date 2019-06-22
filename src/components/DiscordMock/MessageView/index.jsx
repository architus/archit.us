import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isNil } from "../../../util";

import "./style.scss";

function MessageView({ messages, className, channelName, ...rest }) {
  const isEmpty = isNil(messages) || messages.length === 0;
  return (
    <div className={classNames(className, "discord-messages")} {...rest}>
      <div className="inner">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          auctor posuere odio, vitae elementum nulla porttitor sit amet.
          Vestibulum hendrerit sollicitudin elit sit amet elementum. Donec
          pellentesque leo ut sagittis cursus. Maecenas leo felis, euismod vitae
          ornare et, lobortis quis nisl. Praesent augue ipsum, ullamcorper vitae
          bibendum in, egestas ac felis. Nulla ac commodo dui. Vivamus auctor
          est eu lectus fringilla, in suscipit mi ultrices. Aenean ullamcorper
          urna massa, fermentum vulputate elit volutpat eget. Mauris blandit
          tellus et est efficitur facilisis. Nullam sit amet porttitor sem. Sed
          at iaculis nibh. Suspendisse potenti. Nulla eros orci, ornare sed
          vehicula et, varius id est. Nam vel est blandit dui aliquet tristique.
          Nullam quis viverra neque, blandit ultricies massa.
        </p>
        <p>
          Proin nec semper ante, non imperdiet urna. Morbi in semper diam, vel
          dictum arcu. Fusce urna libero, mattis quis ipsum euismod, fringilla
          maximus velit. Vivamus pretium ac enim vitae pulvinar. Vivamus orci
          leo, hendrerit et feugiat sed, consequat iaculis nisi. Ut tempor ipsum
          quis felis iaculis, a facilisis est vehicula. Etiam scelerisque quis
          leo maximus tempus. Proin ornare sapien eget nibh luctus suscipit.
          Aenean efficitur rutrum eleifend.
        </p>
        <p>
          Fusce maximus libero in augue congue pulvinar. Phasellus scelerisque
          tellus elementum diam ultricies, ut imperdiet felis congue. Sed eget
          lacinia nibh. Aenean lobortis sagittis neque, faucibus tempor turpis
          placerat mollis. In pulvinar sodales arcu, id laoreet magna. Ut
          aliquam, mi non dictum fringilla, dolor nulla luctus ligula, in
          pharetra lacus neque sed dui. Phasellus ex felis, ultrices nec elit
          ac, sagittis vestibulum ipsum. Donec varius mauris id porttitor
          laoreet. Aenean nunc augue, commodo vitae auctor sit amet, imperdiet
          sed purus. Suspendisse dictum, purus eget molestie rutrum, massa metus
          molestie felis, et ultrices purus lorem ut justo. Fusce cursus leo sed
          interdum tincidunt. Nullam nec massa tincidunt, ultricies augue in,
          accumsan tellus.
        </p>
        <p>
          Nam erat quam, congue non aliquam at, elementum at lacus. Phasellus
          justo velit, imperdiet a neque et, convallis blandit elit. Integer
          lectus risus, consequat sed faucibus bibendum, molestie eu nibh.
          Vestibulum non eros dignissim, sollicitudin orci vitae, accumsan elit.
          Duis malesuada, dolor quis rutrum feugiat, tellus ante aliquet sem, a
          ultricies orci risus in dolor. Duis maximus et ex vitae lobortis.
          Proin in elit sit amet est dictum dignissim in non leo. Cras volutpat
          elit eu eros dapibus mollis. Mauris dictum dignissim placerat. Cras
          pulvinar lectus id blandit venenatis. Fusce nec leo ac dolor ultrices
          commodo non nec felis. Sed sed est eget ligula vulputate sollicitudin
          aliquam id dui.
        </p>
        <p>
          Proin blandit convallis interdum. Mauris nec turpis dui. Quisque ex
          tellus, faucibus varius risus vitae, lobortis posuere nisi. Duis id
          est dictum, placerat velit non, tincidunt leo. Suspendisse dictum
          aliquet facilisis. Ut nisl dolor, tristique a libero mollis, gravida
          ornare nunc. Nullam a rutrum ex, mattis fringilla risus. Sed et turpis
          eu augue feugiat interdum nec a elit. Etiam lorem neque, malesuada
          placerat ex vitae, hendrerit iaculis lectus.
        </p>
        {!isEmpty ? null : null}
      </div>
    </div>
  );
}
export default MessageView;

MessageView.propTypes = {
  // TODO define message class
  messages: PropTypes.array,
  className: PropTypes.string,
  channelName: PropTypes.string
};
