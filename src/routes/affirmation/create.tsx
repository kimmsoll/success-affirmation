import { createAffirmationItem } from 'api/firebase/affirmation';
import BackButton from 'components/Button/BackButton';
import FormButton from 'components/Button/FormButton';
import FormTextarea from 'components/Form/FormTextarea';
import Title from 'components/Title';
import { useState } from 'react';

const CreateAffirmation = () => {
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.currentTarget.value;
    setValue(currentValue);

    if (!!currentValue.trim()) {
      setIsDisabled(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!!value.trim().length) {
        await createAffirmationItem(value.trim());
      }
    } catch (e) {
      console.log(e);
    } finally {
      setValue('');
      setIsDisabled(true);
    }
    // TODO: alert
  };

  return (
    <section className='flex flex-col gap-5'>
      <Title
        title='확언 생성하기'
        subTitle={`당신의 목표를 확언으로 만들어보세요.\n작은 실천이 잠재의식을 변화시키고, 큰 성취를 이끌어냅니다.`}
      />
      <form onSubmit={handleSubmit} method='post' className='flex flex-col justify-center items-center gap-10'>
        <FormTextarea value={value} handleChangeValue={handleChangeValue} />
        <div className='flex flex-col-reverse w-4/6 sm:flex-row sm:justify-center gap-2'>
          <BackButton />
          <FormButton text='생성하기' disabled={isDisabled} />
        </div>
      </form>
    </section>
  );
};

export default CreateAffirmation;
