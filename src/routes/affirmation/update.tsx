import { getAffirmationItem, updateAffirmationItem } from 'api/firebase/affirmation';
import FormButton from 'components/Button/FormButton';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AffirmationItemType } from 'types/affirmation';

const MAX_LENGTH = 300;

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
    <section className='h-5/6 flex justify-center items-center'>
      <form onSubmit={handleSubmit} method='post' className='flex flex-col gap-10 items-center'>
        <textarea
          value={value}
          onChange={handleChangeValue}
          placeholder={`${MAX_LENGTH}자 이내로 입력해 주세요.`}
          maxLength={MAX_LENGTH}
          required
          className='h-80 w-80 rounded-lg bg-gray-700 p-5 resize-none border-transparent focus:border-transparent focus:ring-0 break-keep'
        />
        <FormButton text='수정하기' disabled={isDisabled} />
      </form>
    </section>
  );
};

export default UpdateAffirmation;
