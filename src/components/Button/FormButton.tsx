interface Props {
  text: string;
  disabled?: boolean;
}

const FormButton = ({ text, disabled = false }: Props) => {
  return (
    <button
      type='submit'
      disabled={disabled}
      className='w-36 h-10 text-base bg-yellow-500 text-gray-900 font-semibold rounded-full hover:bg-yellow-600 hover:text-gray-800 disabled:bg-yellow-600 disabled:text-gray-800 disabled:cursor-not-allowed'
    >
      {text}
    </button>
  );
};

export default FormButton;
