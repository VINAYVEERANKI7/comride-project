import React from "react";
import { Spinner } from "react-bootstrap";

const SpinnerLoading = () => {
  return (
    <>
      <Spinner
        as="span"
        size="sm"
        animation="border"
        className="mx-1"
        variant="light"
        role="status"
        color="white"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
};

export default SpinnerLoading;
