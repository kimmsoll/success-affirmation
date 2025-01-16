## 💰 서비스 소개

"꿈꾸는 것을 글로 쓰고 말로 하면 이루어진다"는 말에서 영감을 받아, **성공 확언을 등록하고 이를 음성으로 따라 읽으면서 실시간으로 읽고 있는 부분을 음성 인식 기능을 통해 확인할 수 있는 프로젝트**입니다.
이 앱은 사용자가 자신의 목표와 성공 확언을 시각적으로 기록하고, 음성을 통해 확인하면서 긍정적인 자기 확신을 강화하고 목표 달성을 돕는 기능을 제공합니다.

## 🚀 배포

https://success-affirmation.vercel.app/

## 🛠️ 기술 스택

- React, React Router, TypeScript
- TanStack Query
- Tailwind CSS (Custom Themes)
- Firebase SDK (Realtime Database)
- react-speech-recognition


## 🗣️ 기능 소개

- Kakao SDK를 활용한 소셜 로그인 및 로그아웃 기능 구현
- Firebase Realtime Database로 데이터의 실시간 동기화 처리
- Tailwind CSS 커스텀 테마를 적용하여 반응형 UI 구축
- TanStack Query를 통한 상태 관리 및 에러 핸들링 표준화
- React Speech Recognition 라이브러리를 사용한 음성 인식 및 실시간 텍스트 매칭

## 💡 구현 상세

- 카카오로 로그인/로그아웃할 수 있습니다.
- 성공 확언을 등록할 수 있습니다.
- 등록한 성공 확언 리스트를 최신순으로 볼 수 있습니다.
- 등록한 성공 확언을 음성 인식을 통해 읽을 수 있습니다.
  (음성 인식 결과와 텍스트를 비교하여 읽은 텍스트의 폰트 색상이 변합니다.)
- 성공 확언을 수정/삭제할 수 있습니다.

## 📸 구현 결과

### 확언 읽기

<img width="600" src="https://github.com/user-attachments/assets/f927b4c8-c617-4fed-b8f8-53e91d97a870"/>

### 전체 UI

| 로그인 | 홈(데이터 無) | 확언 생성 |
|:---:|:---:|:---:|
|<img width="220" alt="로그인 화면" src="https://github.com/user-attachments/assets/5e396979-5b99-4770-bd8f-5adc1875b112" />|<img width="220" alt="빈 데이터 화면" src="https://github.com/user-attachments/assets/f75695db-69c7-4d1f-ae2b-30d394248d5e" />|<img width="220" alt="" src="https://github.com/user-attachments/assets/592d4758-58d3-4bfa-b4bc-da740da6cd43" />|
| 생성하기 | 홈(데이터 有) | 확언 수정 |
|<img width="220" alt="스크린샷 2025-01-07 오후 6 26 00" src="https://github.com/user-attachments/assets/68caf0c6-b870-4328-bdaf-274e4c350272" />|<img width="220" alt="스크린샷 2025-01-07 오후 6 26 17" src="https://github.com/user-attachments/assets/9fa7bcce-38d2-4725-a5cc-c3c833dbf475" />|<img width="220" alt="스크린샷 2025-01-07 오후 6 26 32" src="https://github.com/user-attachments/assets/8d14f08b-91b7-4387-81ab-b54a684998a6" />|
| 삭제하기 | 확언 읽기 | 로그아웃 |
|<img width="220" alt="삭제하기" src="https://github.com/user-attachments/assets/07973b27-f55c-4139-9670-6958f153a84b" />|<img width="220" alt="확언 읽기" src="https://github.com/user-attachments/assets/e0b7375e-ca9c-42cf-9bf6-c8db5aaad7fc" />|<img width="220" alt="로그아웃" src="https://github.com/user-attachments/assets/8157348f-063a-4624-8779-519a9c66af8e" />|
