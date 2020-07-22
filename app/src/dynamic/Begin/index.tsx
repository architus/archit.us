import HeroImage from "@app/assets/begin-hero.inline.svg";
import React, { useContext } from "react";

import { showGuildAddModal } from "@app/dynamic/AppRoot/actions";
import { AppContext } from "@app/dynamic/AppRoot/context";
import { AppPageProps } from "@app/dynamic/AppRoot/types";
import "./style.scss";

type BeginProps = Omit<AppPageProps, "guild">;

const Begin: React.FC<BeginProps> = () => {
  const { dispatch } = useContext(AppContext);
  const openAddGuild = (): void => dispatch(showGuildAddModal());
  return (
    <div className="begin">
      <div>
        <div
          className="begin--hero-img"
          dangerouslySetInnerHTML={{ __html: HeroImage }}
        />
        <h1>Web Dashboard</h1>
        <p>Select a server on the left or add architus to a server to begin</p>
        <button onClick={openAddGuild}>
          Add <strong> architus </strong> to a server
        </button>
      </div>
    </div>
  );
};

export default Begin;
