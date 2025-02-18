import { FaMicrophone, FaRegTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import Button from 'components/Button';
import { useState } from 'react';
import { AffirmationItemType } from 'types/affirmation';
import { getFormattedDate } from 'utils/getFormattedDate';
import { useNavigate } from 'react-router-dom';
import { ApiResult, deleteAffirmationItem } from 'api/firebase/affirmation';
import FeedbackModal from './Modal/FeedbackModal';
import { useModal } from 'hooks/useModal';
import { useFirebaseMutation } from 'hooks/useFirebaseMutation';
import { useQueryClient } from '@tanstack/react-query';
import ROUTES from 'routes';
import { useAuthContext } from 'context/AuthContext';

interface Props {
  data: AffirmationItemType;
}

const AffirmationItem = ({ data }: Props) => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [isFold, setIsFold] = useState(true);

  const { isOpen, openModal, closeModal, modalType } = useModal();
  const isConfirmModal = modalType === 'confirm';

  const queryClient = useQueryClient();
  const { mutateAsync: deleteMutate } = useFirebaseMutation<ApiResult<void>, { id: string; authedUserId: string }>(
    deleteAffirmationItem,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['affirmationList'] });
        navigate(ROUTES.ROOT);
      },
      onError: (error: Error) => {
        console.error(error);
        openModal('error');
      },
    },
  );

  const handleToggleFold = () => {
    setIsFold((prev) => !prev);
  };

  const handleClickRead = () => {
    navigate(`/affirmation/read/${data.id}`);
  };

  const handleClickEdit = () => {
    navigate(`/affirmation/update/${data.id}`);
  };

  const handleDelete = async (id: string) => {
    if (auth?.authedUserId) {
      await deleteMutate({ id, authedUserId: auth.authedUserId });
    }
  };

  const handleClickDelete = () => {
    openModal('confirm');
  };

  return (
    <>
      <li className='w-full min-w-80 max-w-lg bg-black-400 p-5 flex flex-col gap-4 rounded-lg'>
        <p className='text-gray-200'>{getFormattedDate(data.createdAt)}</p>
        <p
          className={`${isFold ? 'line-clamp-5' : ''} my-3 px-5 text-xl text-white-500 cursor-pointer break-words`}
          onClick={handleToggleFold}
        >
          {data.content}
        </p>
        <div className='flex place-content-between'>
          <div className='flex gap-2'>
            <Button onClick={handleClickDelete} style='icon_gray' icon={<FaRegTrashAlt />} />
            <Button onClick={handleClickEdit} style='icon_gray' icon={<MdModeEdit />} />
          </div>
          <Button onClick={handleClickRead} style='md' text='확언읽기' icon={<FaMicrophone />} />
        </div>
      </li>
      <FeedbackModal
        isOpen={isOpen}
        onClose={closeModal}
        title={isConfirmModal ? '삭제하기' : '삭제실패'}
        message={isConfirmModal ? '항목을 삭제하시겠습니까?' : '삭제에 실패했습니다. 다시 시도해주세요.'}
        onConfirm={() => handleDelete(data.id)}
      />
    </>
  );
};

export default AffirmationItem;
