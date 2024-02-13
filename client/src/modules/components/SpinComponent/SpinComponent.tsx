import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const SpinComponent: React.FC<{ spinning?: boolean }> = (props) => {
  const { spinning = true } = props;
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={spinning}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default SpinComponent;
