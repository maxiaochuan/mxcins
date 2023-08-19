/**
 * Rounds the position value to the nearest whole number if the lineWidth is even,
 * otherwise rounds the position value down and adds 0.5.
 *
 * @param {number} position - The position value to be rounded.
 * @param {number} lineWidth - The line width to determine rounding behavior.
 * @return {number} - The rounded position value.
 */
export const pixelSnap = (position: number, lineWidth: number): number => {
  return lineWidth % 2 === 0 ? Math.round(position) : Math.floor(position) + 0.5;
};
