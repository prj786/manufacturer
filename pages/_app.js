import '../styles/globals.css';
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { Container, Grid, Divider } from "@mui/material";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing='auto' justifyContent="space-between">
          <Grid item>
            <Logo />
          </Grid>
          <Grid item>
            <Navigation />
          </Grid>
        </Grid>
      </Container>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
