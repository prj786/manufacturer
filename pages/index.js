import { Container, Grid, Divider, Typography } from "@mui/material";
import CardBox from "../components/Card-box";
import InfoBar from "../components/Info-bar";
import Footer from "../components/Footer";
import { asyncData } from "../shared/api";
import React from "react";

export default function Home() {
  const [items, setItems] = React.useState([]);
  const getList = () => {
    asyncData('product/search?', 'GET', null, { Search: '', Page: 0, PageSize: 100 })
      .then(data => {
        setItems(data.records);
      })
  }
  React.useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <InfoBar />
        <br />
        <Divider>
          <Typography fontSize={'20px'}>
            პროდუქცია
          </Typography>
        </Divider>
        <br />
        <Grid container alignContent={{ xs: 'center' }} spacing={{ xs: 4, md: 3 }} columns={{ xs: 2, sm: 8, md: 16 }}>
          {items.map((item, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <CardBox
                nameGeo={item.nameGeo}
                nameEng={item.nameEng}
                price={item.price}
                id={item.entityId}
                imgSrc={`https://picsum.photos/id/${index}/200`}
                description={item.description}
                author={item.author}
                code={item.code}
                quantity={item.quantity}
                categoryId={item.categoryId}
                images={item.images}
                getData={getList}
              />
            </Grid>
          ))}
        </Grid>
        <br />
        <Footer />
      </Container>
    </>
  )
}
