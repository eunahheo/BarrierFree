// App.js 내용 가져오면 됨
import ReviewPage from "../components/Reviews/ReviewPage";
import HeaderContainer from "../components/containers/HeaderContainer";

function Home() {
  return (
    <div className="Home">
      <HeaderContainer />
      <h1>Home</h1>
      <ReviewPage></ReviewPage>
    </div>
  );
}

export default Home;
