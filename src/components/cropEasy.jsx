import { DialogActions, DialogContent } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
// import { Cancel } from "@mui/icons-material";
import CropIcon from "@material-ui/icons/Crop";
import { Box, Slider, Typography } from "@mui/material";
import { Button } from "bootstrap";
import React, { useState } from "react";
import Cropper from "react-easy-crop";

const CropEasy = ({ photoUrl, setOpenCrop }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {};
  return (
    <>
      <DialogContent
        dividers
        sx={{
          background: "#333",
          position: "relative",
          height: 400,
          width: "auto",
          minWidth: { sm: 5000 },
        }}
      >
        <Cropper
          image={photoUrl}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
        <Box sx={{ width: "100%", mb: 1 }}>
          <Box>
            <Typography>
              Zoom:{zoomPercent(zoom)}
              <Slider
                valueLabelDisplay="auto"
                valueLabelFormat={zoomPercent}
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </Typography>
          </Box>
          <Box>
            <Typography>
              Rotation:{rotation}
              <Slider
                valueLabelDisplay="auto"
                min={0}
                max={360}
                value={rotation}
                onChange={(e, rotattion) => setRotation(rotation)}
              />
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={() => setOpenCrop(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<CropIcon />}
              onClick={cropImage}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </>
  );
};

export default CropEasy;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
