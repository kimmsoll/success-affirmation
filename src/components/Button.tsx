import { ReactElement } from 'react';

interface Props {
  onClick: () => void;
  size: 'sm' | 'md' | 'lg';
  text?: string;
  icon?: ReactElement;
}

const Button = ({ onClick, size, text, icon }: Props) => {
  const buttonStyle = {
    sm: 'w-20 h-9 text-sm bg-gray-700 text-gray-100 font-semibold rounded-full hover:bg-gray-800 hover:text-yellow-600 outline outline-transparent hover:outline-2 hover:outline-yellow-600',
    md: 'w-10 h-10 text-lg bg-gray-200 rounded-full hover:bg-gray-500',
    lg: 'w-32 h-10 text-base bg-yellow-600 text-gray-800 font-semibold rounded-full hover:bg-yellow-500 hover:text-gray-900',
  };

  return (
    <button type='button' onClick={onClick} className={`${buttonStyle[size]} flex justify-center items-center gap-1`}>
      {text && text}
      {icon && icon}
    </button>
  );
};

export default Button;
