import React from "react";

import { Size } from "../../types";

interface Props {
  size?: Size;
}

const Loader = ({ size = "medium" }: Props): JSX.Element => {
  return <div>content is loading with size {size}</div>;
};

export default Loader;
