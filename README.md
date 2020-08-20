<h1 align="center">Welcome to FutSalah 👋</h1>
<p>
  <a href="https://github.com/chloe-codes1/Ms.Movie#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/chloe-codes1/Ms.Movie/blob/master/LICENSE.md" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> SSAFY 3기 2학기 1반 12팀 - `I do Arduino` 의 프로젝트 저장소

<br>

### 🏠 [Explore FutSalah](http://i3a112.p.ssafy.io/)

<br>

## :mag: ​Overview

> _오늘 풋살한판 풋살르자!_

<br>

### 개요

- 기존에 풋살과 관련 서비스 존재하지만 서비스 이용에 **불편한 점**들이 있어 자주 사용을 하지 않는다
- 기존 서비스들의 불편한 점들을 **개선**하고, 라즈베리 파이를 이용한 경기 점수에 **투명성**을 보장하여 이용자들이 좀 더 **편리**하게 사용할 수 있는 사이트 구축을 위한 프로젝트

<br>

### Futsalah vs 기존 서비스 

1. 매칭 등록시 일정한 폼이 존재하여 이용하기 간편하다
2. **랭킹 서비스**를 이용하여 상대팀의 실력을 알 수 있다
3. 팀과 팀원 **관리**가 **용이**하다
4. `Raspberry Pi` 를 활용한 스마트 구장에서 경기한다는 전제 하에 제공하는 서비스 임으로 경기 결과, 출결 등을 바탕으로 **객관적인 신뢰도 서비스**를 제공한다
5. **Formation** 제도를 통해 팀원들의 주요 formation을 알 수 있으며, 전 경기들에 대한 정보들을 제공함으로써 팀에 대한 **상세 정보**를 보다 **간편**하고 **정확**하게 제공한다

<br>

### 주요 기능

#### 1. 회원 관리

<details>
<summary>일반 유저</summary>
<ol>
<li> 소셜 로그인(카카오, 구글)을 통해서 쉽게 회원가입이 가능하다. </li>
<li> 회원정보 탭에서 프로필 사진, 출생 연도, 포지션, 키, 몸무게 정보를 변결할 수 있다. </li>
<li> 로그인하면 생기는 나의 팀 탭에서 내가 속해있는 팀의 목록을 볼 수 있다. </li>
<li> 나의 팀 목록에서 팀 목록을 클릭하면 해당 팀의 상세 정보 페이지로 이동한다.</li>
<li> 팀 나가기를 통해 팀 탈퇴가 가능하다.  </li>
</div>
</details>

<details>
<summary>구장 관리자</summary>
<ol>
<li> 구장 주인의 계정으로 로그인하면 해당구장의 경기 일정을 알 수 있다.  </li>
<li> 경기 리스트를 클릭하면 홈팀, 상대팀의 이름과 qr코드를 인식한 후 두팀 모두 인식한다면 경기를 시작한다.  </li>
<li> 라즈베리파이와 연동되어 경기장에서 골을 넣게 되면 해당 팀의 점수가 올라간다.  </li>
</div>
</details>

#### 2. 팀 관리

<details>
<summary>팀 생성 및 팀원 관리</summary>
<ol>
<li> 팀을 생성할 때 팀 이름에 대한 중복 검사를 한 후 중복된 이름이 없다면 이름, 지역, 프로필을 입력하여 등록할 수 있다.  </li>
<li> 팀원을 추가할 때 해당 유저에게 이메일로 요청이 간다.  </li>
<li> 리더인 팀원이 팀을 탈퇴할 경우, 가장 오래된  유저에게 리더를 넘겨주고 탈퇴한다. </li>
</div>
</details>

<details>
<summary>팀 정보</summary>
<ol>
<li> 팀 마다 고유의 QR 코드가 존재한다. 이때 이 코드는 팀에 속한 사람만이 확인 가능하다. (QR 코드는 경기장에서 출결할 때 사용된다.)</li>
<li> 포메이션을 drag & drop 으로 표시할 수있다.   </li>
<li> 경기전적 탭에서 현재까지 경기 결과들을 알 수 있다.  </li>
<li> 팀 정보에서는 팀에 속한 모든 팀원들을 알 수 있다. </li>
</div>
</details>





<br>

<br>

## :wrench: ​Tech Stack

![](./images/techstack.PNG)

### Backend

- SpringBoot  `2.3.1`

### Frontend

- React  `16.13.1`

### DB

- MySQL  `5.7.31`

### SCM

- Git  `2.17.1`

<br>
<br>

## :pencil2: ERD

![](./images/erd.png)





<br>

<br>

## :runner: Steps to run

### Backend

```bash
$ cd backend
$ mvn package
$ cd target
$ java -jar backend-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
$ cd frontend
$ yarn install 
$ yarn start
```

<br>

<br>

## 👤 Author 

:information_desk_person: ​[김주현](https://github.com/chloe-codes1) - `팀장`  Backend, DevOps

🙋‍♂️ [권혁규](https://github.com/klw940) - `CTO`  Frontend

:raising_hand: ​[유현진](https://github.com/guswls) - Backend

🙆‍♂️ [김형준](https://github.com/hyungjun268) - Frontend

💁‍♂️ [김경훈](https://github.com/oogg7754) - IoT, Frontend

🙋‍♂️ [김동휘](https://github.com/wheeking) - IoT, Frontend

<br>

<br>

## :bulb: ​Wiki 

- [Git 협업 스타일](/docs/Git_협업_스타일.md)

<br>

<br>

## :date: ​Timeline

> 개발 기간: 7/20/2020 ~ 8/21/2020

<br>

### 7/20 (월)

> [기록](/docs/0720_주제선정.md)

- [x] : 주제 선정
- [x] : 기술 스택 선정
- [x] : 개발 환경 세팅

<br>

### 7/21 (화)

> [기록](/docs/0721_기능_세분화.md)

- [x] : 프로젝트 상세 기획

- [x] : 기능 세분화

<br>

### 7/22 (수)

- [x] : DB 설계

<br>
<br>

## 🧚‍♀️ Environment variables 

- 환경 설정 파일 추가하기

  - `.env` 파일을 frontend folder의 root에 추가한다

  ex) 

  ```bash
  PORT= // client port
  REACT_APP_SERVER_BASE_URL=  // server url
  REACT_APP_S3_BASE_URL=  // s3 url
  ```

- 사용법
  
  - `process.env.REACT_APP_{env_var_name}`

<br>

<br>

## 📝 License

Copyright © 2020  I do Arduino <br />
This project is [MIT](https://lab.ssafy.com/s03-webmobile3-sub3/s03p13a112/blob/master/LICENSE) licensed.