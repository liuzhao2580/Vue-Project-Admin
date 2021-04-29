/**得到一个随机数 */
const MathRandom = (randomTime = 1000) => {
  const getTime = new Date().getTime()
  const getRandom = Math.floor(Math.random() * randomTime)
  return `${getTime}${getRandom}`
}
export default MathRandom
