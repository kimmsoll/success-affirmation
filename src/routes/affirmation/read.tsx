import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAffirmationItem } from 'api/firebase/affirmation';
import { FaStop, FaPlay } from 'react-icons/fa';
import { RiResetLeftFill } from 'react-icons/ri';

import Button from 'components/Button';
import BackButton from 'components/Button/BackButton';
import Title from 'components/Title';
import { useModal } from 'hooks/useModal';
import FeedbackModal from 'components/Modal/FeedbackModal';

const ReadAffirmation = () => {
  const { id } = useParams();
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  const [content, setContent] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [readText, setReadText] = useState('');
  const [unreadText, setUnreadText] = useState('');
  const unreadTextRef = useRef<HTMLSpanElement | null>(null);
  const { isOpen, openModal, closeModal, errorMessage } = useModal();

  const fetchData = async (id: string) => {
    try {
      const res = await getAffirmationItem(id);
      if (res.success) {
        setContent(res.data.content);
      } else {
        openModal('error', res.error);
      }
    } catch (e) {
      console.error(e);
      openModal('error');
    }
  };

  const handleClickStart = () => {
    setIsSpeaking(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleClickStop = () => {
    setIsSpeaking(false);
    SpeechRecognition.stopListening();
  };

  const handleClickReset = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    setIsSpeaking(false);
    setReadText('');
    setUnreadText(content);
  };

  useEffect(() => {
    // 일시정지 버튼을 누르기 전까지는, 음성 인식이 종료되면 재시작
    if (isSpeaking && !listening) {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [isSpeaking, listening]);

  useEffect(() => {
    const normalize = (text: string) => text.replace(/[^a-zA-Z0-9가-힣]+/g, '').toLowerCase(); // 특수문자, 공백 제거 및 소문자로 변환
    const normalizedContent = normalize(content);
    const normalizedTranscript = normalize(transcript);

    let matchedLength = 0; // 매칭된 길이
    let realLength = 0; // 특수문자, 공백 포함 실제 길이

    // content와 transcript의 매칭 길이 계산
    for (let i = 0; i <= normalizedTranscript.length; i++) {
      const substring = normalizedTranscript.slice(0, i);
      if (normalizedContent.startsWith(substring)) {
        matchedLength = i;
      } else {
        break;
      }
    }

    // 특수문자, 공백을 제외하고 현재 매칭된 문자의 길이 계산
    for (let i = 0, count = 0; i < content.length; i++) {
      if (!/[^a-zA-Z0-9가-힣]+/g.test(content[i])) {
        count++;
      }
      // 시작 시엔 realLength 에 합산하면 안되므로 0일 경우 제외
      if (count !== 0 && count === matchedLength) {
        realLength = i + 1; // 실제 길이 추적
        break;
      }
      //   TODO: 남은 문자가 모두 특수문자일 경우, read 처리
    }

    setReadText(content.slice(0, realLength));
    setUnreadText(content.slice(realLength));
  }, [transcript, content]);

  useEffect(() => {
    if (unreadTextRef.current) {
      unreadTextRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [unreadText]);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
      resetTranscript();
    };
  }, []);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <>
      <section className='flex flex-col gap-5'>
        <Title
          title='확언 따라 읽기'
          subTitle={`확언을 입으로 따라 읽어보세요.\n내 목소리를 통해 내면에 더욱 깊이 새겨집니다.`}
        />
        <section className='flex flex-col justify-center items-center gap-10'>
          <div className='h-80 w-5/6 sm:w-4/6 bg-gray-900 p-5 rounded-lg overflow-scroll'>
            <p className='my-3 px-5 text-xl break-words'>
              <span className='text-white-500 text-bold'>{readText}</span>
              <span ref={unreadTextRef} className='text-gray-400'>
                {unreadText}
              </span>
            </p>
          </div>
          <div className='flex flex-col-reverse w-4/6 sm:flex-row sm:justify-center gap-2'>
            <BackButton />
            <Button onClick={handleClickReset} text='다시읽기' icon={<RiResetLeftFill />} style='lg_white' />
            {isSpeaking ? (
              <Button onClick={handleClickStop} text='일시정지' icon={<FaStop />} style='lg_red' />
            ) : (
              <Button
                onClick={handleClickStart}
                text='확언읽기'
                icon={<FaPlay className='ps-0.5' />}
                style='lg_green'
              />
            )}
          </div>
        </section>
      </section>
      <FeedbackModal
        type='error'
        isOpen={isOpen}
        onClose={closeModal}
        title='조회실패'
        message={errorMessage ?? '확언 정보를 가져오는 데 실패했습니다.'}
      />
    </>
  );
};

export default ReadAffirmation;
