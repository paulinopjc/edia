import { Paper, Box, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";

// Styled components
const ChatContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: "400px",
  display: "flex",
  flexDirection: "column",
}));

const ChatBox = styled("div")({
  flex: 1,
  overflowY: "auto",
});

const Message = styled("div")({
  margin: "8px",
  padding: "8px 12px",
  borderRadius: "8px",
  maxWidth: "70%",
});

const UserMessage = styled(Message)({
  alignSelf: "flex-end",
  backgroundColor: "#007BFF",
  color: "white",
});

const BotMessage = styled(Message)({
  alignSelf: "flex-start",
  backgroundColor: "#f0f0f0",
});

const InputContainer = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing(2),
}));

const SendButton = styled(Button)({
  minWidth: "100px",
});

interface Message {
  text: string;
  sender: "user" | "bot";
}

const disclaimer =
  "Disclaimer: This chatbot does not replace a formal diagnosis from a mental health professional. It is still recommended to seek help from a licensed therapist.";

const ChatModule: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [response, setResponse] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([{ text: disclaimer, sender: "bot" }]);
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      text: newMessage,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const res = await fetch("/api/rasaEndpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: newMessage }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data.data);
        const botReply: Message = {
          text: data?.data[0]?.text,
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setNewMessage("");
  };

  return (
    <ChatContainer>
      <Paper elevation={3} sx={{ maxHeight: 660, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Chat Module
        </Typography>
        <ChatBox>
          <Box ref={chatBoxRef}>
            {messages.map((message, index) =>
              message.sender === "user" ? (
                <UserMessage key={index}>{message.text}</UserMessage>
              ) : (
                <BotMessage key={index}>{message.text}</BotMessage>
              )
            )}
          </Box>
        </ChatBox>
        <InputContainer>
          <TextField
            label="Type your message..."
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{ flex: 1, marginRight: 2 }}
          />
          <SendButton
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
          >
            Send
          </SendButton>
        </InputContainer>
      </Paper>
    </ChatContainer>
  );
};

export default ChatModule;
