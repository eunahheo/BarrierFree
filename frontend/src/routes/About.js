import { useState, useEffect } from 'react';
import { About } from '../components/about/about';
import { Services } from '../components/about/services';
import { Team } from '../components/about/team';
import Footer from '../components/common/Footer';

const Abouts = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {}, []);

  return (
    <div>
      <Services data={landingPageData.Services} />
      <About data={landingPageData.About} />
      <Team data={landingPageData.Team} />
      <Footer></Footer>
    </div>
  );
};
export default Abouts;
