import React, { useEffect } from "react";
import { Container, Badge } from "react-bootstrap";
import { AppPageProps } from "Dynamic/AppRoot/types";
import ReactDataGrid from "react-data-grid";

import "react-data-grid/dist/react-data-grid.css";
import { useDispatch, useSelector } from "Store";
import { emojis } from "Store/routes";
import { Emoji } from "Utility/types";


const columns = [
  { key: "id", name: "ID" },
  { key: "name", name: "EMOJI NAME" },
  {
    key: "url",
    name: "IMAGE",
    formatter: ({ row }: { row: Emoji }) => <img src={row.url} width ="32"  />,
  },
  {
    key: "authorId",
    name: "AUTHOR",
    formatter: ({ row }: { row: Emoji }) => (
      <>{row.authorId.getOrElse(" None ")}</>
    ),
  },
{ key: "loaded ", name: "LOADED", formatter:({row }: {row: Emoji}) =><> {loadedYN(row.loaded)}</> },
  { key: "numUses", name: "USES" },
];

function loadedYN(x: boolean){
  if (x == true){
    return "Yes"
  }
  else
  {
    return "false"
  }
}

const EmojiManager: React.FC<AppPageProps> = ({ guild }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emojis({ routeData: guild.id }));
  }, [guild]);

  const emojiList = useSelector((store) => {
    return store.emojis[guild.id];
  });

  return (
    <>
      <Container className="py-5">
        <h2>
          EmojiManager <Badge variant="primary">Coming Soon</Badge>
        </h2>
      </Container>
      <ReactDataGrid columns={columns} rows={emojiList || []} rowKey={"id"} />
    </>
  );
};
export default EmojiManager;
