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

    let score;

    // 1. Проверяем, заданы ли свои поинты вручную для этого места
    if (customPoints[rank] !== undefined) {
        score = customPoints[rank];
    } else {
        // 2. Если ручных поинтов нет — считаем по формуле демонлиста
        score = (-24.9975 * Math.pow(rank - 1, 0.4) + 200);
    }

    // Учитываем процент прохождения (старт с 25% очков на минимальном проценте)
        const progressRatio = 0.25 + 0.75 * Math.pow((percent - minPercent) / (100 - minPercent), 1.2);
        score = score * progressRatio;

    if (percent != 100) {
        return round(score - score / 3);
    }

    return Math.max(round(score), 0);
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
