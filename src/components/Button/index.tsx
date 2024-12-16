import { ReactElement } from 'react';

interface Props {
  onClick: () => void;
  style: 'sm' | 'md' | 'lg' | 'icon';
  text?: string;
  icon?: ReactElement;
}

const Button = ({ onClick, style, text, icon }: Props) => {
  const buttonStyle = {
    sm: 'w-20 h-9 text-sm bg-gray-700 text-gray-100 font-semibold rounded-full hover:bg-gray-800 hover:text-yellow-600 outline outline-transparent hover:outline-2 hover:outline-yellow-600',
    md: 'w-32 h-10 text-base bg-yellow-500 text-gray-900 font-semibold rounded-full hover:bg-yellow-600 hover:text-gray-800',
    lg: 'w-36 h-10 text-base bg-gray-800 text-gray-200 font-semibold rounded-full hover:bg-gray-700',
    icon: 'w-10 h-10 text-lg bg-gray-200 text-gray-900 rounded-full hover:bg-gray-500',
  };

  return (
    <button type='button' onClick={onClick} className={`${buttonStyle[style]} flex justify-center items-center gap-1`}>
      {text && text}
      {icon && icon}
    </button>
  );
};

export default Button;
