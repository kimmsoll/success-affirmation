import { createAffirmationItem } from 'api/firebase/affirmation';
import FormButton from 'components/Button/FormButton';
import { useState } from 'react';

const MAX_LENGTH = 300;

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
        <FormButton text='생성하기' disabled={isDisabled} />
      </form>
    </section>
  );
};

export default CreateAffirmation;
