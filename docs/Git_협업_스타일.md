# ![vertical_traffic_light](https://github.githubassets.com/images/icons/emoji/unicode/1f6a6.png) Git 협업 스타일 

> 협업 스타일을 정해 보아요

<br>

## 1.  branch naming rule

기능을 추가할 때는 `feature-추가된 기능` 

ex)

```bash
feature-frontend-login
feature-backend-auth	
```

기능을 수정할 때는 `fix-수정된 기능`

ex)

```bash
fix-frontend-login
fix-backend-auth
```

- branch 는 일회용이다!!
  - merge가 된 branch는 지운다

<br>

## 2. commit message naming rule

commit message는 동사로 시작!

ex)

```bash
$ Add         -> 어떤 기능을 추가했다
$ Modify      -> 어떤 기능을 수정했다
$ Edit        -> 어떤 기능을 수정했다2
$ Fetch       -> 어떤 기능을 데려왔다
$ Complete    -> 어떤 기능을 완료했다
```

jira issue ID는 commit message 앞에 입력

ex)

```bash
Jira이슈아디 | Modify signup confirmation
```

<br>

## 3. merge request / code review / merge rule

### 3-1. merge request - 상세하게!!!!!!!!

Description과 checklist로 쓰기



ex) 

<hr>

### Description

: 로그인 UI  구현

### Checklist

- 버튼 추가
- Password 추가

<hr>

<br>

### 3-2. code review

- 해당 기능과 관련된 사람들에게 Assign 하여 `Code Review` 받기

<br>

### 3-3. merge rule

- merge request를 review 할 때,

  - web에서 `file changes` 에서 변경 코드 확인
  - local로 해당 branch 데려와서 실행 후 잘 작동하는지 확인
    - 어떤 기능이 변했는지 MR 요청할 때 Description에 자세히 써주면 확인하기 더 편하겠죠?? 하핫

  

  <br>

  <br>

  

`+`

### Local로 review 하려는 Branch 데려오는 명령어

```bash
$ git branch -a   
# local + remote에 있는 모든 branch 확인

$ git checkout -t origin/[데려오려는 Branch 이름]  
# 이렇게 하면 remote에 있는 branch를  같은 이름으로 데려올 수 있다~!
```

<br>

<br>

`+`

### Git Commit Message 바꾸기

#### 1. git log 로  commit hash 확인

- 바꾸려는 commit 의 이전 commit hash 복사

#### 2. rebase

```bash
$ git rebase -i [COMMIT_HASH]
```

- 위의 명령어 입력하면 commit message들 목록 뜸

#### 2. `pick` → `reword`

- 바꾸려는 commit message 앞에 pick 을 reword 로 바꾸고 저장 (ctrl + x + y)

#### 4. 해당 커밋 메시지를 다시 작성하는 에디터가 열리면 수정 후 저장

#### 5. Force push

```bash
$ git push origin [해당 branch명] -f
```