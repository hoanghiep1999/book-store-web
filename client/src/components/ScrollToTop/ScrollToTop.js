import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop ({children}) {
  const { pathname } = useLocation();

  const stringURL = pathname.split("/")[1];

  useEffect(() => {
    if (stringURL !== 'category') 
      window.scrollTo(0,0);
  });

  return <>
    {children}
  </>;
}