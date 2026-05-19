# Expressions — 영어 표현 아카이브 & 큐레이션 웹앱

기억하고 싶은 영어 표현을 모으고, 컬렉션으로 정리하고, 발음을 다시 들어볼 수 있는 모바일 친화 웹앱.

- **프레임워크**: Next.js 16 (App Router, static export) + React 19 + TypeScript
- **스타일**: Tailwind CSS v4 + shadcn ui 패턴
- **상태관리**: zustand
- **상태**: 다크모드 우선, 모바일 480px max-width, iOS Safari 친화 (PWA 메타 포함)
- **저장소**: LocalStorage 프로토타입 (추후 Firebase Auth + Firestore로 swap)
- **인증**: 현재는 Google 로그인 mock (실제 Google 인증 X) — 추후 Firebase Auth로 교체

## 라우트

| Path | 설명 |
|---|---|
| `/` | 공개 시드 라이브러리. 로그인 없이 열람 가능. |
| `/search` | 키워드/태그 검색 |
| `/saved` | 로그인 사용자의 저장 표현 |
| `/collections` | 추천 + 내 컬렉션 목록 |
| `/collections/[id]` | 컬렉션 상세 (seed는 `generateStaticParams`로 빌드, 사용자 컬렉션은 클라이언트 사이드 라우팅) |
| `/detail?id=...` | 표현 상세 |
| `/new` | 새 표현 추가 |
| `/profile` | mock Google 로그인/로그아웃 |

## Dev / Build

```bash
cd apps/expressions
npm install
npm run dev
# http://localhost:3000/Claude_Test2/

npm run build
# 정적 export는 apps/expressions/out/ 에 생성됨
# 로컬 프리뷰:
npx serve out -p 8080
# http://localhost:8080/Claude_Test2/
```

## basePath

기본값 `/Claude_Test2` (`next.config.ts`). 다른 경로로 배포하려면:

```bash
NEXT_PUBLIC_BASE_PATH=/your-path npm run build
# 또는 user/org pages root 배포라면:
NEXT_PUBLIC_BASE_PATH= npm run build
```

내부 링크는 모두 `next/link` 사용 — basePath 자동 prefix. 정적 자산은 `withBasePath()` helper 경유.

## 디렉토리 구조

```
src/
  app/                 # 페이지
  components/          # UI (ui/ = shadcn 프리미티브)
  lib/
    types.ts           # ER 다이어그램 → TS 인터페이스
    basePath.ts        # 정적 자산 경로 helper
    storageKeys.ts     # localStorage 키 정의
    tts.ts             # speechSynthesis 래퍼
    repositories/
      types.ts         # 인터페이스 (계약)
      index.ts         # getRepos() 팩토리
      localStorage/    # 현 구현체
    seed/              # 공개 콘텐츠셋
  stores/              # zustand
  hooks/               # React hooks
```

### Repository 경계

LocalStorage는 **임시 구현 디테일**. UI/hook/store는 절대 `localStorage`를 직접 호출하지 않음:

- ✅ `src/lib/repositories/localStorage/*.ts` 에서만 `window.localStorage` 접근 (SSR 가드 포함)
- ❌ 컴포넌트, 페이지, 훅에서 `localStorage` 직접 사용 금지

`useExpressions()`, `useSavedExpressions()` 등의 훅이 `getRepos()` 팩토리를 통해 추상화된 저장소를 사용.

## Firebase 전환 가이드

추후 Google 인증과 Firestore로 교체할 때:

```bash
npm i firebase
```

1. `src/lib/firebase/client.ts` 생성: Web SDK 초기화 (env: `NEXT_PUBLIC_FIREBASE_*`).
2. `src/lib/repositories/firebase/` 디렉토리에 `localStorage/*.ts` 와 동일한 인터페이스 구현.
3. `src/lib/repositories/index.ts`에서 `EXPRESSIONS_BACKEND === 'firebase'` 분기 활성화 (env로 토글).
4. Firestore 컬렉션 매핑 (제안):
   - `expressions/{id}` (subcollections: `examples`, `audio`)
   - `tags/{id}`
   - `users/{uid}/saved/{expressionId}`
   - `users/{uid}/collections/{id}` (subcollection `items`)
   - `users/{uid}/recordings/{id}`
5. **Security Rules**:
   ```
   match /expressions/{doc} { allow read: if true; allow write: if false; }
   match /tags/{doc} { allow read: if true; allow write: if false; }
   match /users/{uid}/{document=**} {
     allow read, write: if request.auth.uid == uid;
   }
   ```
6. `signInWithGoogleMock()` → `signInWithPopup(auth, new GoogleAuthProvider())` 로 교체.
7. `onAuthChanged` → `onAuthStateChanged(auth, cb)` 로 교체.

타입은 그대로 — `src/lib/types.ts` 각 필드의 JSDoc에 원본 snake_case 스키마가 명시돼 있어 매퍼 작성이 쉬움.

## 별도 GitHub 저장소로 옮길 때

이 디렉토리는 완전히 self-contained — `apps/expressions/` 전체를 새 저장소 루트로 복사하면 됩니다:

```bash
# 새 저장소 클론 후
cp -r /path/to/apps/expressions/. /path/to/new-repo/
cd /path/to/new-repo
git add .
git commit -m "Initialize Expressions Archive"
git push
```

배포 워크플로(`.github/workflows/`)는 새 저장소에 맞게 추가해야 합니다 (예: GitHub Pages 정적 배포).

## 알려진 제약 (Prototype)

- 데이터는 브라우저 단일 인스턴스(localStorage)에만 존재 — 기기 간 동기화 X
- Google 로그인은 mock (실제 OAuth flow 없음, 가상 사용자 생성)
- 발음 점수(`USER_RECORDINGS.pronunciation_score`)는 스키마만, 녹음 기능 미구현
- 의미 기반 검색(`SEMANTIC_EMBEDDINGS`)은 추후
- 정적 export 특성상, **사용자 생성 컬렉션 URL 직접 진입/새로고침**은 404 가능 (deploy 시 `404.html → index.html` fallback 권장)
