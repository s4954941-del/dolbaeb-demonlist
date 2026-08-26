/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

/**
 * Словарь со своими фиксированными поинтами (номер места: очки).
 */
const customPoints = {
    1: 300, // для 1 места
    2: 250, // для 2 места
    3: 200, // для 3 места
    4: 150, // для 4 места
    5: 100  // для 5 места
};

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {number} rank position on the list
 * @param {number} percent Percentage of completion
 * @param {number} minPercent Minimum percentage required
 * @returns {number}
 */
export function score(rank, percent = 100, minPercent = 100) {
    if (rank > 150) {
        return 0;
    }

    // Обработка некорректных или пропущенных значений процента
    percent = Number(percent) || 100;
    minPercent = Number(minPercent) || 100;

    if (percent < minPercent) {
        return 0;
    }

    // 1. Получаем базовые поинты за уровень (если места нет в словаре, считаем по стандартной формуле)
    let baseScore = customPoints[rank];
    if (baseScore === undefined) {
        baseScore = Math.max(0, -24.9975 * Math.pow(rank - 1, 0.4) + 200);
    }

    // 2. Если пройдено на 100% (или это верификация) — даём полный балл
    if (percent >= 100) {
        return Number(baseScore.toFixed(scale));
    }

    // 3. Расчёт прогресса (на минимальном проценте даём ровно 25% от базового балла, т.е. 75 очков для 1 места)
    const progressRatio = 0.25 + 0.75 * Math.pow((percent - minPercent) / (100 - minPercent), 1.2);
    const finalScore = baseScore * progressRatio;

    return Number(finalScore.toFixed(scale));
}
