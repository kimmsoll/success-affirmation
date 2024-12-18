import { createAffirmationItem } from 'api/firebase/affirmation';
import BackButton from 'components/Button/BackButton';
import FormButton from 'components/Button/FormButton';
import FormTextarea from 'components/Form/FormTextarea';
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
    <form onSubmit={handleSubmit} method='post' className='h-5/6 flex flex-col justify-center items-center gap-10'>
      <FormTextarea value={value} handleChangeValue={handleChangeValue} />
      <div className='flex flex-col-reverse w-4/6 sm:flex-row sm:justify-center gap-2'>
        <BackButton />
        <FormButton text='생성하기' disabled={isDisabled} />
      </div>
    </form>
  );
};

export default CreateAffirmation;
