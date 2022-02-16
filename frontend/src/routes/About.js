import { useState, useEffect } from 'react';
import { About } from '../components/about/about';
import { Services } from '../components/about/services';
import { Contact } from '../components/about/contact';

const Abouts = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {}, []);

  return (
    <div>
      <Services data={landingPageData.Services} />
      <About data={landingPageData.About} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
};
export default Abouts;
