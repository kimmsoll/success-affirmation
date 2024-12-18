interface Props {
  value: string;
  handleChangeValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MAX_LENGTH = 300;

const FormTextarea = ({ value, handleChangeValue }: Props) => {
  return (
    <textarea
      value={value}
      onChange={handleChangeValue}
      placeholder={`${MAX_LENGTH}자 이내로 입력해 주세요.`}
      maxLength={MAX_LENGTH}
      required
      className='h-80 w-5/6 sm:w-4/6 rounded-lg bg-gray-700 p-5 text-lg resize-none border-transparent focus:border-transparent focus:ring-0 break-keep'
    />
  );
};

export default FormTextarea;
