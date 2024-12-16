import { CONTENT_SCALE } from 'consts/scale_consts';
import { useEffect, useState } from "react";

export const useWindowScale = () => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        function handleResize() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const scaleX = windowWidth / CONTENT_SCALE.CONTENT_WIDTH;
        const scaleY = windowHeight / CONTENT_SCALE.CONTENT_HEIGHT;

        // 横幅と高さの縮小比率の中で最小のものを選ぶ
        const dynamicScale = Math.min(scaleX, scaleY);

        setScale(dynamicScale);
        }

        // 初回ロード時のサイズに基づいてスケーリング
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { scale };
};
