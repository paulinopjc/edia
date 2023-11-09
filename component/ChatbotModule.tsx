import { Paper, Box, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";

const useStyles = makeStyles((theme: any) => ({
  chatContainer: {
    padding: theme.spacing(2),
    minHeight: "400px",
    display: "flex",
    flexDirection: "column",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
  },
  message: {
    margin: "8px",
    padding: "8px 12px",
    borderRadius: "8px",
    maxWidth: "70%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007BFF",
    color: "white",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
  },
  inputContainer: {
    display: "flex",
    marginTop: theme.spacing(2),
  },
  inputField: {
    flex: 1,
    marginRight: theme.spacing(2),
  },
  sendButton: {
    minWidth: "100px",
  },
}));

interface Message {
  text: string;
  sender: "user" | "bot";
}
const disclaimer = "Disclaimer: This chatbot does not replace a formal diagnosis from a mental health professional. It is still recommended to seek help from a licensed therapist.";

const ChatModule: React.FC = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // const newMessage: Message = {
    //   text: disclaimer,
    //   sender: "user",
    // };
    // setMessages((prevMessages) => [...prevMessages, newMessage]);
    // // Automatically scroll to the bottom of the chat box when new messages are added
    // if (chatBoxRef.current) {
    //   chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    // }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      text: newMessage,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");

    // Simulate a bot response (you can replace this with actual bot logic)
    setTimeout(() => {
      const botMessage: Message = {
        text: "This is a bot response.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <Paper elevation={3} className={classes.chatContainer}>
      <Typography variant="h6" gutterBottom>
        Chat Module
      </Typography>
      <Box className={classes.chatBox}>
        {messages.map((message, index) => (
          <div key={index} className={`${classes.message} ${message.sender === "user" ? classes.userMessage : classes.botMessage}`}>
            {message.text}
          </div>
        ))}
      </Box>
      <div className={classes.inputContainer}>
        <TextField label="Type your message..." variant="outlined" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className={classes.inputField} />
        <Button variant="contained" color="primary" onClick={handleSendMessage} className={classes.sendButton}>
          Send
        </Button>
      </div>
    </Paper>
  );
};

export default ChatModule;
