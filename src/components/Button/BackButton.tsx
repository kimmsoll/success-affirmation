import { useNavigate } from 'react-router-dom';
import Button from '.';

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return <Button onClick={handleGoBack} style='lg_gray' text='취소' />;
};

export default BackButton;
