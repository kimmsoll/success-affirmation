import { FaMicrophone } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import Button from 'components/Button';
import { useState } from 'react';
import { AffirmationItemType } from 'types/affirmation';
import { getFormattedDate } from 'utils/getFormattedDate';

interface Props {
  data: AffirmationItemType;
}

const AffirmationItem = ({ data }: Props) => {
  const [isFold, setIsFold] = useState(true);

  const handleToggleFold = () => {
    setIsFold((prev) => !prev);
  };

  const handleClickRead = () => {};
  const handleClickEdit = () => {};

  return (
    <li className='w-full min-w-80 max-w-lg bg-black-400 p-5 flex flex-col gap-4 rounded-lg'>
      <p className='text-gray-200'>{getFormattedDate(data.createdAt)}</p>
      <p
        className={`${isFold ? 'line-clamp-5' : ''} my-3 px-5 text-xl text-white-500 cursor-pointer break-words`}
        onClick={handleToggleFold}
      >
        {data.content}
      </p>
      <div className='flex justify-end gap-2'>
        <Button onClick={handleClickRead} size='lg' text='확언읽기' icon={<FaMicrophone />} />
        <Button onClick={handleClickEdit} size='md' icon={<MdModeEdit className='text-gray-900' />} />
      </div>
    </li>
  );
};

export default AffirmationItem;
