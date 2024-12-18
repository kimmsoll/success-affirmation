interface Props {
  title?: string;
  subTitle?: string;
}

const Title = ({ title, subTitle }: Props) => {
  return (
    <section className='flex flex-col items-center px-5 pt-10 pb-5 gap-2 text-center break-keep'>
      {title && <h1 className='text-xl text-gray-300'>{title}</h1>}
      {subTitle && <p className='text-gray-400 text-sm whitespace-pre-line break-keep'>{subTitle}</p>}
    </section>
  );
};

export default Title;
