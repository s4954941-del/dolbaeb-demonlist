var customPoints = {
    1: 300,
    2: 250,
    3: 200,
    4: 150,
    5: 100
};

export function score(rank, percent, minPercent) {
    var r = parseInt(rank) || 1;
    var p = (percent !== undefined && percent !== null) ? Number(percent) : 100;
    var minP = (minPercent !== undefined && minPercent !== null) ? Number(minPercent) : 100;

    if (r > 150 || p < minP) {
        return 0;
    }

    var baseScore = customPoints[r];
    if (baseScore === undefined) {
        baseScore = Math.max(0, -24.9975 * Math.pow(r - 1, 0.4) + 200);
    }

    if (p >= 100) {
        return Math.round(baseScore * 1000) / 1000;
    }

    var progressRatio = 0.25 + 0.75 * Math.pow((p - minP) / (100 - minP), 1.2);
    var finalScore = baseScore * progressRatio;

    return Math.round(finalScore * 1000) / 1000;
}
