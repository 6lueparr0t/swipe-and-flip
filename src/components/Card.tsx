import { useState, useEffect, useRef } from "react";
import "./Card.css";

interface CardProps {
  colors: string[];
  style: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ colors, style }) => {
  const [backColor, setBackColor] = useState(1);
  const [frontColor, setFrontColor] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentXPercent, setCurrentXPercent] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [startTime, setStartTime] = useState(0); // 스와이프 속도 계산을 위한 시작 시간

  const cardRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const speedThreshold = 0.4; // 속도 임계값 (px/ms)

  // 3초마다 다음 카드로 자동 전환
  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setIsNext(true);
        setCurrentXPercent(100);
        setOpacity(0);

        changeCardHandler();
      }, 3000);
    };

    if (!isDragging) {
      startInterval();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const changeCardHandler = () => {
    setTimeout(() => {
      setIsNext(false);
      setCurrentXPercent(0);
      setOpacity(1);

      setBackColor((prev) => (prev + 1) % colors.length);
      setFrontColor((prev) => (prev + 1) % colors.length);
    }, 300);
  };

  // 마우스 이벤트 핸들러
  const mouseDownHandler = (e: React.MouseEvent) => {
    startDrag(e.clientX);
  };

  const mouseMoveHandler = (e: { clientX: number }) => {
    if (isDragging) {
      handleDrag(e.clientX);
    }
  };

  const mouseUpHandler = (e: { clientX: number }) => {
    endDrag(e.clientX);
  };

  // 터치 이벤트 핸들러
  const touchStartHandler = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    startDrag(touch.clientX);
  };

  const touchMoveHandler = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      handleDrag(touch.clientX);
    }
  };

  const touchEndHandler = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    endDrag(touch.clientX);
  };

  // 공통 드래그 시작 함수
  const startDrag = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setStartTime(Date.now());
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // 드래그 시작 시 일시 중지
    }
  };

  // 공통 드래그 처리 함수
  const handleDrag = (clientX: number) => {
    const cardWidth = cardRef.current?.offsetWidth || 1;
    const movementX = startX - clientX;
    const movementXPercent = (movementX / cardWidth) * 100;
    setCurrentXPercent(-movementXPercent);
    setOpacity(1 - Math.abs(movementXPercent) / 100); // 이동 비율에 따라 불투명도를 조정
  };

  // 공통 드래그 종료 함수
  const endDrag = (clientX: number) => {
    const elapsedTime = Date.now() - startTime; // 스와이프의 경과 시간
    const movementX = startX - clientX;
    const speed = Math.abs(movementX) / elapsedTime; // px/ms 단위로 속도 계산

    setIsDragging(false);

    if (currentXPercent === 0) {
      alert(`CLICK: ${colors[frontColor]}`);
    }

    // 스와이프 속도와 이동 거리에 따라 카드 전환 여부 결정
    if (Math.abs(currentXPercent) > 50 || speed > speedThreshold) {
      setIsNext(true);
      setCurrentXPercent(currentXPercent > 0 ? 100 : -100);
      setOpacity(0);

      changeCardHandler();
    } else {
      setIsNext(true);
      setCurrentXPercent(0);
      setOpacity(1);
    }

    // 3초마다 다음 카드로 자동 전환
    if (!intervalRef.current) {
      const startInterval = () => {
        intervalRef.current = setInterval(() => {
          setIsNext(true);
          setCurrentXPercent(100);
          setOpacity(0);

          changeCardHandler();
        }, 3000);
      };
      startInterval();
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "100%", ...style }}>
        <div
          className="card"
          style={{
            backgroundColor: colors[backColor],
            height: style.height,
            zIndex: 1,
          }}
        >
          {colors[backColor]}
        </div>
        <div
          ref={cardRef}
          className="card"
          style={{
            backgroundColor: colors[frontColor],
            height: style.height,
            zIndex: 2,
            transform: `translate3d(${currentXPercent}%, 0, 0)`,
            opacity: opacity,
            transition: isDragging || !isNext ? "none" : "transform 0.3s ease, opacity 0.3s ease",
          }}
          onMouseDown={mouseDownHandler}
          onMouseMove={mouseMoveHandler}
          onMouseUp={mouseUpHandler}
          onTouchStart={touchStartHandler}
          onTouchMove={touchMoveHandler}
          onTouchEnd={touchEndHandler}
        >
          {colors[frontColor]}
        </div>
      </div>
    </div>
  );
};

export default Card;
