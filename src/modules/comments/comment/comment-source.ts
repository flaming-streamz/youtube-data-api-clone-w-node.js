export default function buildMakeCommentSource({ isValidIp }: { isValidIp: any }) {
  return function makeSource({ ip, browser, referrer }: { ip: string; browser: string; referrer: any }) {
    if (!ip) throw new Error("Comment source must have an IP.");

    if (ip && !isValidIp(ip)) throw new Error("Comment source must have a valid IP.");

    return Object.freeze({
      getIp: () => ip,
      getBrowser: () => browser,
      getReferrer: () => referrer,
    });
  };
}
