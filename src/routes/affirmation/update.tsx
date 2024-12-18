import { getAffirmationItem, updateAffirmationItem } from 'api/firebase/affirmation';
import BackButton from 'components/Button/BackButton';
import FormButton from 'components/Button/FormButton';
import FormTextarea from 'components/Form/FormTextarea';
import Title from 'components/Title';
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
    <section className='flex flex-col gap-5'>
      <Title
        title='확언 수정하기'
        subTitle={`당신의 확언을 수정하여 목표를 더 명확하게 설정하세요.\n강력한 확언으로 더 빛나는 내일의 나를 만들어보세요.`}
      />
      <form onSubmit={handleSubmit} method='post' className='flex flex-col justify-center items-center gap-10'>
        <FormTextarea value={value} handleChangeValue={handleChangeValue} />
        <div className='flex flex-col-reverse w-4/6 sm:flex-row sm:justify-center gap-2'>
          <BackButton />
          <FormButton text='수정하기' disabled={isDisabled} />
        </div>
      </form>
    </section>
  );
};

export default UpdateAffirmation;
