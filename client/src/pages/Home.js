import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Api";

const Home = () => {
  return (
    <>
      <Main />
      <Row
        rowId={1}
        title="Top Rated Movies"
        fetchUrl={requests.topRatedMovies}
      />
      <Row
        rowId={2}
        title="Top Rated Shows"
        fetchUrl={requests.topRatedShows}
      />
      <Row
        rowId={3}
        title="Trending"
        fetchUrl={requests.trending}
      />
      <Row
        rowId={4}
        title="Up Coming"
        fetchUrl={requests.upComing}
      />
    </>
  );
};

export default Home;
