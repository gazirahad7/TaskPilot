import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ThemeItem({ img, color }) {
  //   const [theme, setTheme] = React.useState("/bg-one.jpg");

  //   console.log({ theme });

  //   if (theme !== theme) {
  //     const appMain = document.querySelector(".app-main");
  //     appMain.style.backgroundImage = `"url('${theme}')"`;
  //   }

  return (
    <div>
      {
        <LazyLoadImage
          src={img}
          alt="Theme Item"
          height={60}
          width={60}
          loading="lazy"
        />
      }
    </div>
  );
}

export default ThemeItem;
