/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Словарь с кастомными очками (место: очки)
 */
const customPoints = {
    1: 300,
    2: 250,
    3: 200,
    4: 150,
    5: 100
};

/**
 * Calculate the score awarded when having a certain percentage on a list level
 */
export function score(rank, percent, minPercent) {
    if (rank > 150) {
        return 0;
    }
    if (rank > 75 && percent < 100) {
        return 0;
    }

    // 1. Получаем базовые очки за 100% (P_max)
    let scoreVal = customPoints[rank];
    if (scoreVal === undefined) {
        scoreVal = (-24.9975 * Math.pow(rank - 1, 0.4) + 200);
    }

    // 2. Расчет за прогресс по формуле с корнем из 5
    if (percent != 100) {
        const pMax = scoreVal;
        const pMin = scoreVal * 0.25;

        const progressRatio = Math.pow((percent - minPercent) / (100 - minPercent), Math.sqrt(5));
        scoreVal = pMin + (pMax - pMin) * progressRatio;
    }

    return round(scoreVal);
}

function round(num) {
    const factor = Math.pow(10, scale);
    return Math.round(num * factor) / factor;
}
