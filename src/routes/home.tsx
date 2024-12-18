import { useEffect, useState } from 'react';
import AffirmationList from 'components/AffirmationList';
import { getAffirmationList } from 'api/firebase/affirmation';
import { AffirmationItemType } from 'types/affirmation';
import Title from 'components/Title';

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

  return (
    <section>
      <Title
        title='당신의 꿈은 이미 실현 가능한 현실입니다'
        subTitle={`우리의 행동 중 약 90%는 잠재의식에 의해 결정됩니다.\n목표를 명확히 하고, 매일 긍정적인 확언으로 당신의
          잠재의식을 성공의 에너지로 채워보세요.`}
      />
      <AffirmationList data={data} />
    </section>
  );
};

export default Home;
