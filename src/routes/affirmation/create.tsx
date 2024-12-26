import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackButton from 'components/Button/BackButton';
import FormButton from 'components/Button/FormButton';
import FormTextarea from 'components/Form/FormTextarea';
import FeedbackModal from 'components/Modal/FeedbackModal';
import Title from 'components/Title';

import { ApiResult, createAffirmationItem } from 'api/firebase/affirmation';
import { useFirebaseMutation } from 'hooks/useFirebaseMutation';
import { ModalType, useModal } from 'hooks/useModal';
import { useQueryClient } from '@tanstack/react-query';
import ROUTES from 'routes';

const CreateAffirmation = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const { isOpen, openModal, closeModal, modalType, errorMessage } = useModal();

  const queryClient = useQueryClient();

  const { mutateAsync } = useFirebaseMutation<ApiResult<void>, { content: string }>(createAffirmationItem, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['affirmationList'] });
      navigate(ROUTES.ROOT);
    },
    onError: (error: Error) => {
      console.error(error);
      openModal('error');
    },
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.currentTarget.value;
    setValue(currentValue);

    if (!!currentValue.trim()) {
      setIsDisabled(false);
    }
  };

  const handleSubmit = async () => {
    if (!!value.trim().length) {
      await mutateAsync({ content: value.trim() });
    }
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal('confirm');
  };

  return (
    <>
      <section className='flex flex-col gap-5'>
        <Title
          title='확언 생성하기'
          subTitle={`당신의 목표를 확언으로 만들어보세요.\n작은 실천이 잠재의식을 변화시키고, 큰 성취를 이끌어냅니다.`}
        />
        <form onSubmit={handleConfirmSubmit} method='post' className='flex flex-col justify-center items-center gap-10'>
          <FormTextarea value={value} handleChangeValue={handleChangeValue} />
          <div className='flex flex-col-reverse w-4/6 sm:flex-row sm:justify-center gap-2'>
            <BackButton />
            <FormButton text='생성하기' disabled={isDisabled} />
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

export default CreateAffirmation;

const getModalText = (modalType: ModalType) => {
  switch (modalType) {
    case 'confirm':
      return {
        title: '생성하기',
        message: '항목을 생성하시겠습니까?',
      };
    case 'error':
      return {
        title: '생성실패',
        message: '생성에 실패했습니다. 다시 시도해주세요.',
      };
  }
};
