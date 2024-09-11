import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Testimonials from "pages/Presentation/sections/Testimonials";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

import routes from "routes";
import footerRoutes from "footer.routes";

import bgImage from "assets/images/bg-presentation.jpg";
import { API_URL } from "constants/coonstant.";

function Presentation() {
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    type: "",
    skills: "",
    label: "",
    city: "",
    contract: "",
    minexperience: "",
    language: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOffers();
  }, [page, filters]);

  const loadOffers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: {
          ...filters,
          page,
          pageSize: 21,
        },
      });

      setOffers(response.data.data.offers);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Erreur lors de la récupération des offres", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <DefaultNavbar
        routes={routes}
      />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              <p>IAGORA</p>
              <p>Offre Emplois / Stage</p>
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Container>
        <Testimonials />
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <TextField
                label="Type"
                variant="outlined"
                fullWidth
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <TextField
                label="Compétences"
                variant="outlined"
                fullWidth
                name="skills"
                value={filters.skills}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <TextField
                label="Label"
                variant="outlined"
                fullWidth
                name="label"
                value={filters.label}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <TextField
                label="Ville"
                variant="outlined"
                fullWidth
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} mt={3}>
            {loading ? (
              <MKTypography variant="body2" color="textSecondary">
                Chargement des offres...
              </MKTypography>
            ) : offers.length > 0 ? (
              offers.map((offer, index) => (
                <Grid item xs={12} lg={4} key={index}>
                  <FilledInfoCard
                    color="info"
                    icon="work"
                    title={offer.label}
                    description={offer.shortdescription}
                    action={{
                      type: "internal",
                      route: `/offre/${offer.id}`,
                      label: "Voir plus",
                    }}
                  />
                </Grid>
              ))
            ) : (
              <MKTypography variant="body2" color="textSecondary">
                Aucune offre trouvée.
              </MKTypography>
            )}
          </Grid>
          <Grid container justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Grid>
        </Container>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Presentation;
