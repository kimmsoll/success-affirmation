import { AffirmationItemType } from 'types/affirmation';
import ListItem from './AffirmationItem';

interface Props {
  data: AffirmationItemType[];
}

const AffirmationList = ({ data }: Props) => {
  return (
    <main className='px-5 py-5'>
      <ul className='flex flex-col items-center gap-4'>
        {data.map((item: AffirmationItemType) => (
          <ListItem key={item.id} data={item} />
        ))}
      </ul>
    </main>
  );
};

export default AffirmationList;