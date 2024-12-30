import Button from 'components/Button';
import { ModalType } from 'hooks/useModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm?: () => void; // 확인 버튼에 대한 콜백 (확인 모달의 경우)
  confirmText?: string; // 확인 버튼 텍스트
  cancelText?: string; // 취소 버튼 텍스트
  type?: ModalType; // 모달 타입
}

const FeedbackModal = ({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  type = 'confirm',
}: Props) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (type === 'confirm' && onConfirm) onConfirm();
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black-500 bg-opacity-80'>
      <div className='bg-black-600 rounded-lg shadow-lg p-6 mx-2 max-w-md w-full'>
        <h2 className={`text-lg font-semibold mb-4 ${type === 'error' ? 'text-red-500' : 'text-gray-200'}`}>{title}</h2>
        <p className='text-gray-200 mb-6'>{message}</p>
        <div className='flex justify-end gap-2'>
          {type === 'confirm' && <Button text={cancelText} style='sm_gray' onClick={onClose} />}
          <Button text={confirmText} style='sm_white' onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
