import React from "react";
import loadingIcon from "/assets/images/loading.svg";
const Loading = () => {
  return <div className="w-full min-h-full flex justify-center items-center">
    <img src={loadingIcon} width={100} />
  </div>;
};

export default Loading;
