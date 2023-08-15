import { Source } from "../interfaces";

export default function buildMakeCommentSource({ isValidIp }: { isValidIp: (ip: string) => boolean }) {
  return function makeSource({ ip, browser, referrer }: Source) {
    if (!ip) throw new Error("Comment source must have an IP.");

    if (ip && !isValidIp(ip)) throw new Error("Comment source must have a valid IP.");

    return Object.freeze({
      getIp: () => ip,
      getBrowser: () => browser,
      getReferrer: () => referrer,
    });
  };
}

export type MakeSourceHandler = ({
  browser,
  ip,
  referrer,
}: Source) => Readonly<{ getIp: () => string; getBrowser: () => string; getReferrer: () => string }>;
