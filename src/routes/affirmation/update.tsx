import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiResult, getAffirmationItem, updateAffirmationItem } from 'api/firebase/affirmation';

import BackButton from 'components/Button/BackButton';
import FormButton from 'components/Button/FormButton';
import FormTextarea from 'components/Form/FormTextarea';
import FeedbackModal from 'components/Modal/FeedbackModal';
import Title from 'components/Title';

import { AffirmationItemType } from 'types/affirmation';
import { ModalType, useModal } from 'hooks/useModal';
import { useFirebaseQuery } from 'hooks/useFirebaseQuery';
import { useFirebaseMutation } from 'hooks/useFirebaseMutation';
import { useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from 'components/Loading';
import ROUTES from 'routes';
import { useAuthContext } from 'context/AuthContext';

const UpdateAffirmation = () => {
  const { id } = useParams();
  const auth = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [data, setData] = useState<AffirmationItemType | null>(null);
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const { isOpen, openModal, closeModal, modalType, errorMessage } = useModal();

  const {
    data: fetchedData,
    isLoading,
    isError,
    error,
  } = useFirebaseQuery(['affirmationItem', id as string], () => {
    if (auth?.authedUserId) {
      return getAffirmationItem({ authedUserId: auth?.authedUserId, affirmationId: id as string });
    }
    return Promise.reject('로그인한 사용자가 없습니다.');
  });

  const { mutateAsync: updateMutate } = useFirebaseMutation<
    ApiResult<void>,
    { id: string; content: string; authedUserId: string }
  >(updateAffirmationItem, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['affirmationList'] });
      navigate(ROUTES.ROOT);
    },
    onError: (error: Error) => {
      console.error(error);
      openModal('error');
    },
  });

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
      setValue(fetchedData.content);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (isError) {
      openModal('error', error!.message);
    }
  }, [isError]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.currentTarget.value;
    setValue(currentValue);

    const isUpdating = !!currentValue.trim() || currentValue.trim() !== data?.content;
    if (isUpdating) {
      setIsDisabled(false);
    }
  };

  const handleSubmit = async () => {
    if (!!value.trim().length && !!auth?.authedUserId) {
      await updateMutate({ id: id as string, content: value.trim(), authedUserId: auth?.authedUserId });
    }
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openModal('confirm');
  };

  return (
    <section className='flex flex-col justify-center items-center'>
      {!isLoading ? (
        <section className='flex flex-col gap-5 w-full'>
          <Title
            title='확언 수정하기'
            subTitle={`당신의 확언을 수정하여 목표를 더 명확하게 설정하세요.\n강력한 확언으로 더 빛나는 내일의 나를 만들어보세요.`}
          />
          <form
            onSubmit={handleConfirmSubmit}
            method='post'
            className='flex flex-col justify-center items-center gap-10'
          >
            <FormTextarea value={value} handleChangeValue={handleChangeValue} />
            <div className='flex flex-col-reverse w-4/6 sm:flex-row sm:justify-center gap-2 mb-20'>
              <BackButton />
              <FormButton text='수정하기' disabled={isDisabled} />
            </div>
          </form>
        </section>
      ) : (
        <LoadingSpinner />
      )}
      <FeedbackModal
        isOpen={isOpen}
        onClose={closeModal}
        title={getModalText(modalType).title}
        message={errorMessage ?? getModalText(modalType).message}
        onConfirm={handleSubmit}
      />
    </section>
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
