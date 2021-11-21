import React from "react";
import user from "../../store/userStore";

const General = (): JSX.Element => {
  return <div>{user.data.role}</div>;
};

export default General;
