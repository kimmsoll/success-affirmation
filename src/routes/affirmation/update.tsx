import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAffirmationItem, updateAffirmationItem } from 'api/firebase/affirmation';

import BackButton from 'components/Button/BackButton';
import FormButton from 'components/Button/FormButton';
import FormTextarea from 'components/Form/FormTextarea';
import FeedbackModal from 'components/Modal/FeedbackModal';
import Title from 'components/Title';

import { AffirmationItemType } from 'types/affirmation';
import { ModalType, useModal } from 'hooks/useModal';

const UpdateAffirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<AffirmationItemType | null>(null);
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const { isOpen, openModal, closeModal, modalType, errorMessage } = useModal();

  const fetchData = async (id: string) => {
    try {
      const res = await getAffirmationItem(id);
      if (res.success) {
        setData(res.data);
        setValue(res.data.content);
      } else {
        openModal('error', res.error);
      }
    } catch (e) {
      console.error(e);
      openModal('error');
    }
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.currentTarget.value;
    setValue(currentValue);

    const isUpdating = !!currentValue.trim() || currentValue.trim() !== data?.content;
    if (isUpdating) {
      setIsDisabled(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!!value.trim().length) {
        const res = await updateAffirmationItem(id as string, value.trim());
        if (res.success) {
          navigate('/');
        } else {
          openModal('error', res.error);
        }
      }
    } catch (e) {
      console.error(e);
      openModal('error');
    } finally {
      setValue('');
      setIsDisabled(true);
    }
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal('confirm');
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <>
      <section className='flex flex-col gap-5'>
        <Title
          title='확언 수정하기'
          subTitle={`당신의 확언을 수정하여 목표를 더 명확하게 설정하세요.\n강력한 확언으로 더 빛나는 내일의 나를 만들어보세요.`}
        />
        <form onSubmit={handleConfirmSubmit} method='post' className='flex flex-col justify-center items-center gap-10'>
          <FormTextarea value={value} handleChangeValue={handleChangeValue} />
          <div className='flex flex-col-reverse w-4/6 sm:flex-row sm:justify-center gap-2'>
            <BackButton />
            <FormButton text='수정하기' disabled={isDisabled} />
          </div>
        </form>
      </section>
      <FeedbackModal
        isOpen={isOpen}
        onClose={closeModal}
        title={getModalText(modalType).title}
        message={errorMessage ?? getModalText(modalType).message}
        onConfirm={handleSubmit}
      />
    </>
  );
};

export default UpdateAffirmation;

const getModalText = (modalType: ModalType) => {
  switch (modalType) {
    case 'confirm':
      return {
        title: '수정하기',
        message: '항목을 수정하시겠습니까?',
      };
    case 'error':
      return {
        title: '수정실패',
        message: '수정에 실패했습니다. 다시 시도해주세요.',
      };
  }
};
