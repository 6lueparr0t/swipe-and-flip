# Swipe & Flip

## 미리보기

<https://github.com/user-attachments/assets/4ea1b1ce-deac-4ddf-bd4c-26f3a31ffaa9>

## 주요 기능

1. **카드 크기**: 각 카드의 넓이와 높이가 서로 다르게 설정
2. **자동 전환 (AUTO TRANSITION)**: 각 카드는 3초간 아무런 액션이 없을 경우 자동으로 다음 카드로 전환
3. **클릭 이벤트**: 카드를 클릭하면 클릭한 카드의 색상이 Alert 창에 표시
4. **스와이프(SWIPE) 기능**
    - 각 카드는 손가락 제스처(모바일) 및 마우스를 사용하여 좌우로 스와이프 가능
    - 스와이프 중에는 드래그된 거리만큼 카드가 이동하며, 이동 중인 카드의 투명도(opacity)가 실시간으로 조정
    - 카드의 넓이의 50% 이상 움직인 상태에서 손을 떼면 다음 카드로 전환
    - 카드의 넓이의 50% 미만으로 움직인 상태에서 손을 떼면 원래 카드 위치로 돌아감
5. **Flip 기능**:
    - 손가락을 떼기 직전에 **일정 속도 이상 (0.4px/ms)** 으로 플립하면 다음 카드로 전환

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                            |
| :------------------------ | :------------------------------------------------ |
| `pnpm install`            | Installs dependencies                             |
| `pnpm run dev`            | Starts local dev server at `localhost:4321`       |
| `pnpm run build`          | Build your production site to `./dist/`           |
