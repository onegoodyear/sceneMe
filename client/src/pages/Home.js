import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Api";

const Home = () => {
  return (
    <>
      <Main />
      <Row
        title="Top Rated Movies"
        fetchUrl={requests.topRatedMovies}
      />
      <Row
        title="Top Rated Shows"
        fetchUrl={requests.topRatedShows}
      />
      <Row
        title="Trending"
        fetchUrl={requests.trending}
      />
      <Row
        title="Up Coming"
        fetchUrl={requests.upComing}
      />
    </>
  );
};

export default Home;
