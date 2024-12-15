import { useEffect, useState } from 'react';
import AffirmationList from 'components/AffirmationList';
import { getAffirmationList } from 'api/firebase/affirmation';
import { AffirmationItemType } from 'types/affirmation';

const Home = () => {
  const [data, setData] = useState<AffirmationItemType[]>([]);

  const fetchData = async () => {
    const data = await getAffirmationList();
    if (data?.length) {
      setData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <AffirmationList data={data} />;
};

export default Home;
