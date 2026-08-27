/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Словарь со своими фиксированными поинтами (номер места: очки).
 * Заполни под свои нужды:
 */
const customPoints = {
    1: 300,   // Для 1 места
    2: 250,   // Для 2 места
    3: 200,   // Для 3 места
    // Добавляй свои места по аналогии: 4: 180, 5: 160 и т.д.
};

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
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

    // 2. Если прохождение не 100%, считаем по формуле с картинки
    if (percent != 100) {
        const pMax = scoreVal;
        const pMin = scoreVal * 0.25; // 25% от максимальных очков за минимальный %

        const progressRatio = Math.pow((percent - minPercent) / (100 - minPercent), Math.sqrt(5));
        scoreVal = pMin + (pMax - pMin) * progressRatio;
    }

    return round(scoreVal);
}

function round(num) {
    return Math.round(num * Math.pow(10, scale)) / Math.pow(10, scale);
}
