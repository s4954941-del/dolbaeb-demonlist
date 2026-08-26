/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Фиксированные очки за места
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

    // 1. Берем свои поинты или считаем стандартную формулу
    let scoreVal = customPoints[rank];
    if (scoreVal === undefined) {
        scoreVal = (-24.9975 * Math.pow(rank - 1, 0.4) + 200);
    }

    // 2. Учитываем процент
    scoreVal *= ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    scoreVal = Math.max(0, scoreVal);

    if (percent != 100) {
        scoreVal = scoreVal - (scoreVal / 3);
    }

    // 3. Безопасное округление без StandardMath
    const factor = Math.pow(10, scale);
    return Math.round(scoreVal * factor) / factor;
}
