import Pagination from "./components/Pagination";

interface Props {
  searchParams: { page: string };
}

const Home = ({ searchParams }: Props) => {
  return (
    <Pagination
      total={23}
      pageSize={10}
      currentPage={parseInt(searchParams.page) || 1}
    />
  );
};

export default Home;
