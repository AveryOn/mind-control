
// Вычисление процента
export function computeFilledPercent(currentFilledCount: number, total: number) {
    try {
        let filledPerc =  Math.ceil(currentFilledCount / (total / 100));
        return filledPerc;
    } catch (err) {
        console.error('@/utils/computed.ts: computeFilledPercent => ', err);
        throw err;
    }
}