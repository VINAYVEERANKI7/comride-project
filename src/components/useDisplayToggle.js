import React, { useEffect } from "react";

const useDisplayToggle = ({
  onClickRef,
  insideClickRef,
  setDisplay,
  setTableDisplay = () => {},
}) => {
  const handleOutsideClick = (event) => {
    if (
      onClickRef.current &&
      !onClickRef?.current?.contains(event.target) &&
      !insideClickRef?.current?.contains(event.target)
    ) {
      setDisplay(false);
      setTableDisplay(null);
    }
  };
  useEffect(() => {
    document?.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document?.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
};

export default useDisplayToggle;
