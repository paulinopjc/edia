import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getNotificationsClient } from "@helper/client/notification";
import ChatModule from "@components/ChatbotModule";
import GoogleMapComponent from "@components/EdiaComps/ClinicFinder";

const GoogleMapContainer = () => {
  const { data: session, status } = useSession({ required: true });
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    if (status == "authenticated") {
      getNotificationsClient(session?.user._id!, session?.user.accessToken!, setPolicies);
    }
  }, [status]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <GoogleMapComponent />
    </Container>
  );
};

export default GoogleMapContainer;
