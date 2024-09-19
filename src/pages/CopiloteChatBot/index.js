import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import MKBox from "components/MKBox";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <IconButton onClick={toggleChatbot} style={{ position: "fixed", bottom: 620, right: 20, zIndex: 1000 }}>
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </IconButton>

      {isOpen && (
        <MKBox
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: "400px",
            height: "600px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <iframe
            src={`https://copilotstudio.microsoft.com/environments/Default-bc20447d-8952-4acd-83e4-5d68b5ece46f/bots/cr215_iagoraRechercheDeStageEtDemplois/webchat?__version__=2&numETU=${localStorage.getItem("numETU")}&nom=${localStorage.getItem("nom")}`}
            frameBorder="0"
            style={{ width: "100%", height: "100%" }}
            title="Chatbot"
          />
        </MKBox>
      )}
    </div>
  );
}

export default Chatbot;
