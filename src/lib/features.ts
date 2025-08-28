/**
 * Exponential Moving Average
 * @param prev Previous EMA value (undefined for first calculation)
 * @param x Current value
 * @param alpha Smoothing factor (0-1, higher = more responsive)
 * @returns New EMA value
 */
export function ema(
  prev: number | undefined,
  x: number,
  alpha: number
): number {
  if (prev === undefined) {
    return x;
  }
  return alpha * x + (1 - alpha) * prev;
}

/**
 * Rolling Standard Deviation
 * @param samples Array of numerical samples
 * @returns Standard deviation of the samples
 */
export function rollingStd(samples: number[]): number {
  if (samples.length === 0) return 0;
  if (samples.length === 1) return 0;

  const mean = samples.reduce((sum, val) => sum + val, 0) / samples.length;
  const variance =
    samples.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    samples.length;

  return Math.sqrt(variance);
}
