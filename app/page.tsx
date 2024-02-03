import Pagination from "./components/Pagination";

const Home = () => {
  return <Pagination total={11} pageSize={10} currentPage={1} />;
};

export default Home;
