/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Фиксированные очки за места (изменяй значения под свой Demonlist)
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
 * @param {number} rank position on the list
 * @param {number} percent Percentage of completion
 * @param {number} minPercent Minimum percentage required
 * @returns {number}
 */
export function score(rank, percent, minPercent) {
    if (rank > 150) {
        return 0;
    }
    if (rank > 75 && percent < 100) {
        return 0;
    }

    // Берём кастомные поинты, а если места нет в списке — считаем по формуле
    let score = customPoints[rank];
    if (score === undefined) {
        score = (-24.9975 * Math.pow(rank - 1, 0.4) + 200);
    }

    // Учитываем процент прохождения
    score *= ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    score = Math.max(0, score);

    if (percent != 100) {
        return round(score - (score / 3));
    }

    return round(score);
}

function round(num) {
    if (!StandardMath.ROUND_TO_STEP) {
        return Math.round(num * Math.pow(10, scale)) / Math.pow(10, scale);
    }
    return Math.round(num * StandardMath.ROUND_TO_STEP) / StandardMath.ROUND_TO_STEP;
}
