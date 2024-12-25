import { useEffect, useState } from 'react';
import AffirmationList from 'components/AffirmationList';
import { getAffirmationList } from 'api/firebase/affirmation';
import { AffirmationItemType } from 'types/affirmation';
import Title from 'components/Title';
import FeedbackModal from 'components/Modal/FeedbackModal';
import { useModal } from 'hooks/useModal';

const Home = () => {
  const [data, setData] = useState<AffirmationItemType[]>([]);
  const { isOpen, openModal, closeModal, errorMessage } = useModal();

  const fetchData = async () => {
    try {
      const res = await getAffirmationList();
      if (res.success) {
        setData(res.data);
      } else {
        openModal('error', res.error);
      }
    } catch (e) {
      console.error(e);
      openModal('error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section>
        <Title
          title='당신의 꿈은 이미 실현 가능한 현실입니다'
          subTitle={`우리의 행동 중 약 90%는 잠재의식에 의해 결정됩니다.\n목표를 명확히 하고, 매일 긍정적인 확언으로 당신의
          잠재의식을 성공의 에너지로 채워보세요.`}
        />
        <AffirmationList data={data} />
      </section>
      <FeedbackModal
        type='error'
        isOpen={isOpen}
        onClose={closeModal}
        title='조회실패'
        message={errorMessage ?? '확언 목록을 가져오는 데 실패했습니다.'}
      />
    </>
  );
};

export default Home;
