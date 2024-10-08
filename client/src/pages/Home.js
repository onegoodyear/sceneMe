import Main from "../components/Main";
import Row from "../components/Row";

import { endpoints } from "../Api";

const Home = () => {
  return (
    <>
      <Main />
      <Row
        rowId={1}
        title="Top Rated Movies"
        endpoint={endpoints.topRatedMovies}
      />
      <Row
        rowId={2}
        title="Top Rated Shows"
        endpoint={endpoints.topRatedShows}
      />
      <Row
        rowId={3}
        title="Trending"
        endpoint={endpoints.trending}
      />
      <Row
        rowId={4}
        title="Up Coming"
        endpoint={endpoints.upComing}
      />
    </>
  );
};

export default Home;
