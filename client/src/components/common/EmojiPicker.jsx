import { Box, Typography, Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import "./MobileScreen.css";

const EmojiPicker = (props) => {
  // State to manage selected emoji and whether the picker is shown
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  // Update selectedEmoji when props.icon changes
  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  // Function to handle emoji selection
  const selectEmoji = (e) => {
    const sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    props.onChange(emoji);
  };

  // Function to toggle emoji picker visibility
  const showPicker = () => setIsShowPicker(!isShowPicker);

  return (
    <Box sx={{ position: "relative", width: "max-content" }}>
      <Tooltip title="Select Emoji">
        <Typography
          variant="h3"
          fontWeight="700"
          sx={{ cursor: "pointer" }}
          onClick={showPicker}
        >
          {selectedEmoji}
        </Typography>
      </Tooltip>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          top: "100%",
          zIndex: "9999",
        }}
      >
        <Picker theme="dark" onSelect={selectEmoji} showPreview={false} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
