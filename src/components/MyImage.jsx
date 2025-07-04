import React, { useState } from "react";
import { Box } from "@mui/material";

const MyImage = ({ imgs = [{ url: "" }] }) => {
  const [mainImage, setMainImage] = useState(imgs[0]);

  return (
    <Box>
      {/* Main Image Box */}
      <Box
        sx={{
          width: "100%",
          height: { xs: "250px", sm: "300px", md: "400px" },
          borderRadius: 2,
          overflow: "hidden",
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={mainImage.url}
          alt="product"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover", 
            display: "block",
          }}
        />
      </Box>

      {/* Thumbnails */}
      {imgs.length > 1 && (
        <Box display="flex" gap={2} mt={2}>
          {imgs.map((img, i) => (
            <Box
              component="img"
              key={i}
              src={img.url}
              alt={`thumb-${i}`}
              onClick={() => setMainImage(img)}
              sx={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                border: mainImage.url === img.url ? "2px solid blue" : "1px solid gray",
                cursor: "pointer",
                borderRadius: 1,
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MyImage;
