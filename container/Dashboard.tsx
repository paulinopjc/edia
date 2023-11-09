import { AppBar, Toolbar, Typography, Container, Grid, Paper, Card, CardContent, List, ListItem, ListItemText, Divider } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getNotificationsClient } from "@helper/client/notification";

const Dashboard = () => {
  const { data: session, status } = useSession({ required: true });
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    if (status == "authenticated") {
      getNotificationsClient(session?.user._id!, session?.user.accessToken!, setPolicies);
    }
  }, [status]);

  const dashboardStyles = {
    paper: {
      padding: "20px",
      marginBottom: "20px",
      minHeight: "200px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    chart: {
      padding: "20px",
      minHeight: "200px",
      display: "flex",
      flexDirection: "column",
    },
  };

  const newsData = [
    {
      title: "The Importance of Mental Health",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Mental Health Awareness Week",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    // Add more news articles here
  ];

  const chartData = [];
  for (let i = 1; i <= 7; i++) {
    chartData.push({ day: `Day ${i}`, value: Math.floor(Math.random() * 100) });
  }

  const articlesData = [
    {
      title: "Understanding Anxiety Disorders",
      content: "Anxiety disorders are a common mental health issue that affects millions of people worldwide.",
    },
    {
      title: "Depression: Causes and Treatments",
      content: "Learn about the causes, symptoms, and treatment options for depression.",
    },
    // Add more articles here
  ];

  const definitionsData = [
    {
      term: "Depression",
      definition: "Depression is a mood disorder characterized by persistent sadness and a lack of interest or pleasure in activities.",
    },
    {
      term: "Anxiety",
      definition: "Anxiety is a normal and often healthy emotion, but when it becomes overwhelming, it can be a disorder.",
    },
    // Add more definitions here
  ];

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={dashboardStyles.paper}>
              <Typography variant="h5">Mental Health News</Typography>
              <List>
                {newsData.map((article, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText primary={article.title} secondary={article.description} />
                    </ListItem>
                    {index < newsData.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={dashboardStyles.chart}>
              <Typography variant="h5">Statistics</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#007ACC" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={dashboardStyles.paper}>
              <Typography variant="h5">Mental Health Articles</Typography>
              <List>
                {articlesData.map((article, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText primary={article.title} secondary={article.content} />
                    </ListItem>
                    {index < articlesData.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={dashboardStyles.paper}>
              <Typography variant="h5">Mental Health Definitions</Typography>
              <List>
                {definitionsData.map((definition, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText primary={definition.term} secondary={definition.definition} />
                    </ListItem>
                    {index < definitionsData.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
