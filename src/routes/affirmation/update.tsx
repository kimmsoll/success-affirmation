import { getAffirmationItem, updateAffirmationItem } from 'api/firebase/affirmation';
import BackButton from 'components/Button/BackButton';
import FormButton from 'components/Button/FormButton';
import FormTextarea from 'components/Form/FormTextarea';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AffirmationItemType } from 'types/affirmation';

const UpdateAffirmation = () => {
  const { id } = useParams();

  const [data, setData] = useState<AffirmationItemType | null>(null);
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const fetchData = async (id: string) => {
    const data = await getAffirmationItem(id);
    if (data) {
      setData(data);
      setValue(data.content);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!!value.trim().length) {
        await updateAffirmationItem(id as string, value.trim());
      }
    } catch (e) {
      console.log(e);
    } finally {
      setValue('');
      setIsDisabled(true);
    }
    // TODO: alert
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <form onSubmit={handleSubmit} method='post' className='h-5/6 flex flex-col justify-center items-center gap-10'>
      <FormTextarea value={value} handleChangeValue={handleChangeValue} />
      <div className='flex flex-col-reverse w-4/6 sm:flex-row sm:justify-center gap-2'>
        <BackButton />
        <FormButton text='수정하기' disabled={isDisabled} />
      </div>
    </form>
  );
};

export default UpdateAffirmation;
