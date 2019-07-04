import { useState, useEffect } from "react";

export function useReturnQuery() {
  if (process.env.PRODUCTION_URL) {
    return "";
  } else {
    const [returnQuery, setReturnQuery] = useState("");
    useEffect(() => {
      if (returnQuery === "") {
        setReturnQuery(
          `return=${encodeURIComponent(
            `${window.location.protocol}//${window.location.host}/app`
          )}`
        );
      }
    });
    return returnQuery;
  }
}
