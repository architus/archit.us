import React, { useContext } from "react";
import HeroImage from "Assets/begin-hero.inline.svg";
import { AppContext } from "Dynamic/AppRoot/context";
import { showGuildAddModal } from "Dynamic/AppRoot/actions";
import { AppPageProps } from "Dynamic/AppRoot/types";
import "./style.scss";

type BeginProps = {} & Omit<AppPageProps, "guild">;

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
        <h2>Web Dashboard</h2>
        <p>Select a server on the left or add architus to a server to begin</p>
        <button onClick={openAddGuild}>
          Add <strong> architus </strong> to a server
        </button>
      </div>
    </div>
  );
};

export default Begin;
