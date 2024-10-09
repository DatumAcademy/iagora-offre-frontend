import { useState, useEffect } from "react";
import { Container, Grid, AppBar, Card, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { API_URL } from "constants/coonstant.";
import { useNavigate } from "react-router-dom";

function SuggestionOffrePage() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const numETU = localStorage.getItem("numETU");

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_URL}/student/list/recommandation/${numETU}`);
      console.log(response.data.studentData.recommendations);
      const data = response.data.studentData.recommendations;
      setOffers(data);
    } catch (error) {
      console.error("Erreur lors du chargement des candidatures :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/offre/${id}`);
  };

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={10}>
          <AppBar position="static"></AppBar>

          {loading ? (
            <Grid container justifyContent="center" alignItems="center" color="primary" style={{ height: "50vh"}}>
              <CircularProgress sx={{ color: '#2196f3' }}/>
            </Grid>
          ) : (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {offers.map((offer) => (
                <Grid item xs={12} md={6} lg={4} key={offer.id}>
                  <Card sx={{ p: 2 }} onClick={() => handleCardClick(offer.offer_id)}>
                    <Typography variant="h6">{offer.label}</Typography>
                    <hr />
                    <Typography variant="body2">
                      <strong>Entreprise :</strong> {offer.entreprise}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
export default SuggestionOffrePage;
