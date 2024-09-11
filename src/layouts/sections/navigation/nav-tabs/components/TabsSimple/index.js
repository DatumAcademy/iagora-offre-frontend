import { useState, useEffect } from "react";
import { Container, Grid, AppBar, TextField, Card, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { API_URL } from "constants/coonstant.";

function StudentApplications() {
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useState({
    label: "",
    skills: "",
    type: ""
  });

  const numETU  = localStorage.getItem("numETU");

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_URL}/student/${numETU}`, {
        params: {
          page,
          ...searchParams
        }
      });
      const data = response.data.data;
      setOffers(data.offers);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erreur lors du chargement des candidatures :", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [page, searchParams]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value
    }));
  };

  return (
    <Container>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={10}>
          <AppBar position="static">
          </AppBar>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Titre du poste"
                  name="label"
                  fullWidth
                  value={searchParams.label}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Compétences (séparées par des virgules)"
                  name="skills"
                  fullWidth
                  value={searchParams.skills}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Type"
                  name="type"
                  fullWidth
                  value={searchParams.type}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {offers.map((offer) => (
              <Grid item xs={12} md={6} lg={4} key={offer.id}>
                <Card sx={{ p: 2 }}>
                  <Typography variant="h6">{offer.label}</Typography>
                  <hr></hr>
                  <Typography variant="body2"><strong>Entreprise :</strong> {offer.company}</Typography>
                  <Typography variant="body2"><strong>Compétences :</strong> {offer.skills}</Typography>
                  <Typography variant="body2"><strong>Type de contrat :</strong> {offer.contract}</Typography>
                  <Typography variant="body2"><strong>Ville :</strong> {offer.city}</Typography>
                  <Typography variant="body2"><strong>Date de publication :</strong> {offer.publicationdate}</Typography>
                  <Typography variant="body2"><strong>Date limite :</strong> {offer.deadlinedate}</Typography>
                  <Typography variant="body2"><strong>Nombre de candidats :</strong> {offer.candidate ? offer.candidate.length : 0}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 4, display: "flex", justifyContent: "center" }}
            color="primary"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default StudentApplications;
