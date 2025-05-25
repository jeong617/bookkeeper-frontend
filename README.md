
# BOOKKEEPER

작가들을 위한 웹사이트 BOOKKEEPER 입니다.

자유롭게 소설을 올리면 AI가 자연스러운 TTS를 제공합니다!

![BOOKKEEPER](https://github.com/user-attachments/assets/0d0b6655-6e13-44af-9bca-62ea37f20da4)


## 프로젝트 소개

- 내가 쓴 소설을 자유롭게 업로드 할 수 있습니다.
- 소설을 업로드 하면 AI를 통해 TTS 파일을 제작할 수 있습니다.
- 댓글 및 에피소드 업로드 정보를 알림으로 받아볼 수 있습니다.

## 기능

- 반응형 디자인
- 디바운싱/스로틀링을 통한 API 중복 요청 방지
- 폴링 방식을 통한 TTS 업로드 상태 업데이트
- 웹폰트를 통한 폰트 최적화


## Tech Stack

**FrontEnd:** React, Zustand, TailwindCSS, ReactQuery

**BackEnd:** Node, Spring, Java

**협업 툴:** Jira, Discord, Notion

**모니터링:** Prometheus & Grafana

## 폴더구조
```
├── README.md
├── .eslintrc.js
├── .gitignore
├── package-lock.json
├── package.json
│
├── public
└── src
     ├── App.tsx
     ├── App.css
     ├── api
     │     └── functional
     ├── asset
     ├── layout
     ├── store
     │     ├── notificationData.ts
     │     ├── novelDetailInterface.ts
     │     ├── store.tsx                
     │     ├── types.tsx                
     │     └── userData.ts
     ├──components
     │     ├── header/
     │     │      └── index.tsx             
     │     ├── CommentItem.tsx       
     │     ├── EpisodeListItem.tsx   
     │     ├── FormButton.tsx        
     │     ├── InputBox.tsx          
     │     ├── MainButton.tsx        
     │     ├── MemberItem.tsx        
     │     ├── PendingAdminItem.tsx  
     │     ├── SearchBar.tsx         
     │     ├── SelectChip.tsx        
     │     ├── SideBar.tsx           
     │     ├── SimpleBookCard.tsx    
     │     └── StatsListItem.tsx     
     ├── pages
     │     ├── auth
     │     │     ├── Login.tsx
     │     │     ├── Register.tsx
     │     │     └── AuthSkeleton.tsx
     │     ├── form
     │     │     ├── AddBook.tsx
     │     │     ├── PopUp.tsx
     │     │     ├── UpdateEpisode.tsx
     │     │     └── UpdateEpisode.tsx.tsx
     │     ├── BookDetail.tsx
     │     ├── DashBoard.tsx
     │     ├── Feedback.tsx
     │     ├── FileUploadMonitor.tsx
     │     ├── Home.tsx
     │     ├── ManageMember.tsx
     │     ├── NovelRequest.tsx
     │     ├── PushNotification.tsx
     │     ├── SearchResult.tsx
     ├── routes
     └── util
           ├── backgroundUploader.ts
           ├── getToken.ts          
           ├── parseDateTime.ts     
           └── roleUpdater.ts       

```

## 트러블슈팅
- 문제 상황
    - TTS 파일 업로드 상태가 실시간으로 자동 업데이트가 되지 못함
- 해결 방법
    - 실시간 통신을 위한 기술 중 웹소켓과 폴링 방식을 비교 분석 후, 폴링 방식을 채택하여 해결
    - AI서버가 수행하는 TTS 변환은 10분 이상의 시간이 소요되는 상황. 이 때 웹소켓 연결을 유지하는 것은 서버에 부담일 수 있다고 판단
- 결과
    - 폴링 방식을 채택하여, 실시간성이 엄격히 요구되지 않는 상황에서 서버 부담을 줄이며 효과적인 데이터 갱신이 가능하게 함
- 배운 점
    - 기능의 목적성과 서버 규모 등 다양한 변수를 고려하여 기술을 선택하는 경험을 쌓음


## Screenshots
![BOOKKEEPER (1)](https://github.com/user-attachments/assets/caeb29db-6351-4246-9525-ef5cb669cc54)
<img width="100%" alt="스크린샷 2025-05-26 06 04 30" src="https://github.com/user-attachments/assets/385cdf26-cbbc-4c18-8a5c-2c41911d3315" />



