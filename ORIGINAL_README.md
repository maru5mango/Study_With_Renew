# Team23 - Study with

<img src = "https://user-images.githubusercontent.com/64254228/124480168-f3a52a80-dde1-11eb-85c6-beda53e30259.png" />
<br/>
<br/>
⭐개발자들의 프로젝트형 스터디 모임 (letsple Clone Coding) ⭐

포트폴리오와 스터디를 결합한 **프로젝트형 스터디 모임을 모집하고 관리**할 수 있는 웹 어플리케이션 입니다.  
팀 프로젝트는 하고 싶은데 **프론트? 백엔드? 관심 기술 스택? 프로젝트 레벨?** 모든 것을 고려해서 팀원 찾기 힘드시죠? **🤬**  
**STUDY_WITH**를 이용하면 기술로 자신을 이야기하고, 프로젝트형 스터디를 쉽게 모집할 수 있습니다.  
웹, 앱, 게임 등 다양한 분야의 개발자와 협업의 기회를 찾아보세요!**🥰**

<br/>

# 프로젝트 기간

2021.04.04 ~ 2021.07.09 ( 약 3개월 )

<br />

# 프로젝트 관리

- PostMan을 이용하여 벡엔드 API 관리

- 애자일 스크럼 방식을 이용하여 스프린트 단위의 개발 진행관리

- ESLint, Prettier를 이용하여 코드 스타일 통일

<br />

# 디렉토리 구조

```bash
STUDY_WITH
├── .gitignore
├── .prettierrc
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── .env
├── types
├── server
│   ├── config
│   │   └── env.ts
│   ├── middleware
│   │   └── auth.middleware.ts
│   ├── models
│   │   ├── UserRole.ts
│   │   ├── UserRole.interface.ts
│   │   ├── User.ts
│   │   ├── User.interface.ts
│   │   ├── Project.ts
│   │   ├── Project.interface.ts
│   │   ├── Like.ts
│   │   ├── Like.interface.ts
│   │   ├── Comment.ts
│   │   ├── Comment.interface.ts
│   │   ├── Alarm.ts
│   │   └── Alarm.interface.ts
│   ├── routes
│   │   ├── Alarm.ts
│   │   ├── Comment.ts
│   │   ├── Like.ts
│   │   ├── ManageProject.ts
│   │   ├── Project.ts
│   │   └── User.ts
│   ├── app.ts
│   └── db.ts
├── client
│   ├── node_modules
│   ├── public
│   ├── .eslintrc
│   ├── .gitignore
│   ├── .prettierrc
│   ├── data.json
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── src
│   │   ├── api
│   │   │   ├── types
│   │   │   │    ├── index.ts
│   │   │   │    └── alarm.ts
│   │   │   ├── alarm.ts
│   │   │   ├── auth.ts
│   │   │   ├── home.ts
│   │   │   ├── like.ts
│   │   │   └── users.ts
│   │   ├── Components
│   │   │   ├── BuildProject
│   │   │   ├── Common
│   │   │   ├── Home
│   │   │   ├── Mypage
│   │   │   ├── People
│   │   │   └── Project
│   │   ├── hoc
│   │   │   └── auth.tsx
│   │   ├── hook
│   │   │   └── useCreateAlarm.ts
│   │   ├── img
│   │   ├── modules
│   │   │   ├── auth.ts
│   │   │   ├── home.ts
│   │   │   ├── signup.ts
│   │   │   ├── userInfo.ts
│   │   │   ├── index.ts
│   │   │   ├── like.ts
│   │   │   ├── login.ts
│   │   │   └── logout.ts
│   │   ├── Pages
│   │   │   ├── BuildProject
│   │   │   ├── Home
│   │   │   ├── Mypage
│   │   │   ├── People
│   │   │   ├── Project
│   │   │   ├── Signup
│   │   │   └── UpdateProject
│   │   ├── App.tsx
│   │   ├── Config.ts
│   │   ├── index.tsx
│   │   ├── react-app-env.d.ts
│   │   ├── Router.tsx
│   │   ├── setupProxy.ts
│   │   ├── styeld.d.ts
│   │   └── theme.ts
└── tsconfig.json
```

# 📌 주요 기능

## 로그인

<img src = "https://user-images.githubusercontent.com/64254228/124483741-a5922600-dde5-11eb-9368-f89f71d27f5e.PNG" />

- 구글 로그인 API를 사용하여 구글 계정으로 로그인 및 회원가입이 가능합니다. (0Auth)

  <br/>

## 좋아요

<img src = "https://user-images.githubusercontent.com/64254228/124484765-c444ec80-dde6-11eb-8c7b-1dcdbde62a2c.gif" />
<img src = "https://user-images.githubusercontent.com/64254228/124484767-c5761980-dde6-11eb-9f2c-6d0ae3353a37.gif" />

- 프로젝트 모집 글 및 유저 좋아요를 할 수 있습니다.
- My page -> 구독 탭에서 좋아요 한 프로젝트 및 유저 확인 가능합니다.

  <br/>

## 프로젝트 지원하기

<img src = "https://user-images.githubusercontent.com/64254228/124603450-e8ff9980-dea4-11eb-945c-2594b1444c1a.gif" />

- 본인의 직무와 맞는 프로젝트 지원이 가능합니다.
- 지원 시 작성자에게 알람 전송이 됩니다.

  <br/>

## 쪽지 기능

<img src = "https://user-images.githubusercontent.com/64254228/124603458-ea30c680-dea4-11eb-86fc-52a322e6e5de.PNG" />

- 유저에게 쪽지를 전송할 수 있습니다.
- 해당 유저는 My Page -> 알람 탭에서 확인 및 답장 가능합니다.

  <br/>

## 프로젝트 초대

<img src = "https://user-images.githubusercontent.com/64254228/124603463-eac95d00-dea4-11eb-8ffa-fee53f6cae11.gif" />

- 유저에게 본인이 작성한 프로젝트 모집 글 중에서 초대가 가능합니다.

  <br/>

# 📄 페이지

## Main 페이지

<img src = "https://user-images.githubusercontent.com/64254228/124481408-33b8dd00-dde3-11eb-95a4-9f1c11e9c6a1.gif" />

- 신규 프로젝트 및 모집 중인 프로젝트를 볼 수 있습니다.
- 신규 가입 유저 및 프로젝트 미 참여 중인 유저를 볼 수 있습니다.

  <br/>

## 회원가입 페이지

<img src = "https://user-images.githubusercontent.com/64254228/124612138-0cc6dd80-dead-11eb-8031-3bf766844141.PNG" />

- 구글 0Auth 인증이 완료되면 회원가입을 할 수 있습니다.

  <br/>

## Project 페이지

<img src = "https://user-images.githubusercontent.com/64254228/124605005-72639b80-dea6-11eb-8853-faa70aba8a19.PNG" />

- 프로젝트 모집 글을 볼 수 있습니다.
- 검색 조건을 통해서 원하는 조건의 프로젝트만 골라 볼 수 있습니다.

  <br/>

## Project 상세 페이지

### 정보 탭

<img src = "https://user-images.githubusercontent.com/64254228/124608633-d471d000-dea9-11eb-8d25-05c8045c4e6c.gif" />

- 프로젝트 모집글의 작성 내용을 볼 수 있습니다.
- 해당 프로젝트 작성자(리더)와 참여중인 멤버들을 볼 수 있습니다.

  <br/>

### 질문 탭

<img src = "https://user-images.githubusercontent.com/64254228/124608629-d3d93980-dea9-11eb-82d5-33ade55ea0bb.PNG" />

- 해당 프로젝트에 대한 질문을 남길 수 있습니다.

  <br/>

### 관리 탭

<img src = "https://user-images.githubusercontent.com/64254228/124608632-d471d000-dea9-11eb-8ebe-3fc9c5ed2a82.PNG" />

- 프로젝트의 작성자 외에는 접근할 수 없습니다.
- 지원자들을 볼 수 있고 해당 프로젝트의 멤버로 영입할 수 있습니다.
- 현재 참여중인 멤버들을 추방 시킬 수 있습니다.
- 게시글 삭제 및 수정이 가능합니다.

  <br/>

## Project 작성 페이지

<img src = "https://user-images.githubusercontent.com/64254228/124612127-0afd1a00-dead-11eb-9099-f20f0623a6f7.gif" />

- 프로젝트의 모집글을 작성할 수 있습니다.

  <br/>

## Co-worker 페이지

<img src = "https://user-images.githubusercontent.com/64254228/124604999-71cb0500-dea6-11eb-8af7-da84170d28b8.PNG" />

- 가입된 유저들을 볼 수 있습니다.
- 검색 조건을 통해서 원하는 조건의 유저만 골라 볼 수 있습니다.

  <br/>

## Co-worker 상세 페이지

<img src = "https://user-images.githubusercontent.com/64254228/124608636-d50a6680-dea9-11eb-8da1-32aacecc5aeb.PNG" />

- 해당 유저에 대한 정보를 볼 수 있습니다.
- 해당 유저에게 쪽지를 보낼 수 있습니다.
- 해당 유저에게 프로젝트 초대를 보낼 수 있습니다.

  <br/>

## My 페이지

### 정보 탭

<img src = "https://user-images.githubusercontent.com/64254228/124608638-d5a2fd00-dea9-11eb-9fe5-2ac14fd3eb77.gif" />

- 본인에 대한 정보를 추가 및 수정할 수 있습니다.

  <br/>

### 프로젝트 탭

<img src = "https://user-images.githubusercontent.com/64254228/124608640-d5a2fd00-dea9-11eb-916f-77b8fd3bd911.PNG" />

- 지원한 프로젝트 및 현재 진행중인 프로젝트를 확인할 수 있습니다.

  <br/>

### 구독 탭

<img src = "https://user-images.githubusercontent.com/64254228/124608644-d63b9380-dea9-11eb-8504-db8c4f291689.PNG" />

- 좋아요한 프로젝트 및 좋아요한 유저를 확인할 수 있습니다.

  <br/>

### 알람 탭

<img src = "https://user-images.githubusercontent.com/64254228/124608619-d340a300-dea9-11eb-9e64-c26d5e38f3e8.PNG" />

- 나에게 도착한 알람을 확인할 수 있습니다.
- 알람의 종류: 쪽지, 작성한 프로젝트의 질문, 프로젝트 초대, 프로젝트 지원 수락

  <br/>

# 💻 프로젝트 실행하기

1. .gitignore 파일

```
  /* .env 파일 */
  DB_URL = mongodbatlas 연결 주소


  /* client/src/Config.ts */
  export const SERVER_URL = 서버 주소
  export const USER_SERVER = '/api/users';
  export const PROJECT_SERVER = '/api/projects';
  export const LIKE_SERVER = '/api/like';
  export const MANAGE_SERVER = '/api/manage';
  export const COMMENT_SERVER = '/api/comment';
  export const ALARM_SERVER = '/api/alarm';
  export const LOCAL_HOST = 서버 주소
  export const GOOGLE_CLINET_ID =
   구글 클라이언트 아이디

```

2. root Dir: npm i
3. /client Dir: npm i
4. root Dir: npm run dev

- 클라이언트, 서버 동시 실행

  <br/>

# 💻 API 명세서

https://documenter.getpostman.com/view/15993262/Tzm5HcHf

  <br/>

# 📚 기술 스택

<img src = "https://user-images.githubusercontent.com/64254228/125050930-69104400-e0dd-11eb-8c7d-7cddd9c3ce00.png" width="85%" height="350px"/>

  <br/>
  
# 📌 팀원소개

|                                                  구동현                                                   |                                                  마주은                                                   |                                                  용현준                                                   |
| :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/82129110?v=4" alt="img" height="150px" width="150px" /> | <img src="https://avatars.githubusercontent.com/u/63353110?v=4" alt="img" height="150px" width="150px" /> | <img src="https://avatars.githubusercontent.com/u/64254228?v=4" alt="img" height="150px" width="150px" /> |
|                                  [dhgu-dev](https://github.com/dhgu-dev)                                  |                                [maru5mango](https://github.com/maru5mango)                                |                               [YongCoding](https://github.com/Yongveloper)                                |
