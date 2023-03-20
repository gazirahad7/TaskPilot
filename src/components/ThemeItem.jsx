import React from "react";

function ThemeItem({ img, color }) {
  //   const [theme, setTheme] = React.useState("/bg-one.jpg");

  //   console.log({ theme });

  //   if (theme !== theme) {
  //     const appMain = document.querySelector(".app-main");
  //     appMain.style.backgroundImage = `"url('${theme}')"`;
  //   }

  return <div>{<img src={img} alt="Theme Item" height={60} width={60} />}</div>;
}

export default ThemeItem;
