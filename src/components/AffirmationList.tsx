import { PiHandsPrayingFill } from 'react-icons/pi';
import { AffirmationItemType } from 'types/affirmation';
import ListItem from './AffirmationItem';

interface Props {
  data: AffirmationItemType[];
}

const AffirmationList = ({ data }: Props) => {
  return (
    <main className='w-full px-5 py-5 mb-20'>
      <ul className='flex flex-col items-center gap-4'>
        {data.length ? (
          data.map((item: AffirmationItemType) => <ListItem key={item.id} data={item} />)
        ) : (
          <div className='flex flex-col items-center justify-center py-20 gap-2 text-gray-500'>
            <PiHandsPrayingFill fontSize='48px' />
            <p>등록된 데이터가 없습니다</p>
          </div>
        )}
      </ul>
    </main>
  );
};

export default AffirmationList;
