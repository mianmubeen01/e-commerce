import { useState } from "react";
import { Box } from "@mui/material";

const MyImage = ({ imgs = [{ url: "" }] }) => {
  const [mainImage, setMainImage] = useState(imgs[0]);

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
      {/* Thumbnails */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {imgs.map((curElm, index) => (
          <Box
            key={index}
            component="img"
            src={curElm.url}
            alt={`thumbnail-${index}`}
            onClick={() => setMainImage(curElm)}
            sx={{
              width: 60,
              height: 60,
              objectFit: "cover",
              cursor: "pointer",
              borderRadius: 1,
              border: mainImage.url === curElm.url ? "2px solid #1976d2" : "1px solid #ccc",
              boxShadow: 2,
            }}
          />
        ))}
      </Box>

      {/* Main Image */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={mainImage.url}
          alt="main-display"
          sx={{
            width: "100%",
            maxWidth: 500,
            maxHeight: 400,
            objectFit: "contain",
            borderRadius: 2,
            boxShadow: 4,
          }}
        />
      </Box>
    </Box>
  );
};

export default MyImage;
