const scale = 3;

const customPoints = {
    1: 300,
    2: 250,
    3: 200,
    4: 150,
    5: 100
};

export function score(rank, percent, minPercent) {
    var r = Number(rank) || 1;
    var p = Number(percent);
    var minP = Number(minPercent);

    if (isNaN(p)) { p = 100; }
    if (isNaN(minP)) { minP = 100; }

    if (r > 150 || p < minP) {
        return 0;
    }

    var baseScore = customPoints[r];
    if (baseScore === undefined) {
        baseScore = Math.max(0, -24.9975 * Math.pow(r - 1, 0.4) + 200);
    }

    if (p >= 100) {
        return Number(baseScore.toFixed(scale));
    }

    var progressRatio = 0.25 + 0.75 * Math.pow((p - minP) / (100 - minP), 1.2);
    var finalScore = baseScore * progressRatio;

    return Number(finalScore.toFixed(scale));
}
