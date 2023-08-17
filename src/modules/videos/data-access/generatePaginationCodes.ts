// Simulated list of items
// const items = Array.from({ length: 1000 });

// Function to get a page of items based on the token
// function getPageItems(token: string, pageSize: number): any[] {
//   const pageIndex = decodePageToken(token);
//   const startIndex = pageIndex * pageSize;
//   return items.slice(startIndex, startIndex + pageSize);
// }

export default function makeGeneratePaginationCodes() {
  const BIG_NUMBER = 1000000; // 10^6
  const TOKEN_LENGTH = 6;

  return function generatePaginationCodes(currentPage: number) {
    const nextPageTokenNumber = encodePageToken(currentPage + 1);
    const prevPageTokenNumber = encodePageToken(currentPage - 1);

    const nextPageToken = encodeNumberToCode(Number(nextPageTokenNumber));
    const prevPageToken = encodeNumberToCode(Number(prevPageTokenNumber));

    const nextPageNumber = decodeCodeToNumber(nextPageToken);
    const prevPageNumber = decodeCodeToNumber(prevPageToken);

    const numbers = {
      nextPageNumber,
      prevPageNumber,
    };
    const tokens = {
      nextPageToken,
      prevPageToken,
    };

    return { numbers, tokens };
  };

  // Function to encode a token based on the current page
  function encodePageToken(page: number): string {
    const adjustedPage = page + BIG_NUMBER;
    const token = adjustedPage.toString().padStart(TOKEN_LENGTH, "0");
    return token;
  }

  // Function to encode a number to a 6-character code using base36 encoding
  function encodeNumberToCode(number: number): string {
    const baseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const codeLength = 6;

    let code = "";
    while (number > 0) {
      const remainder = number % baseChars.length;
      code = baseChars[remainder] + code;
      number = Math.floor(number / baseChars.length);
    }

    // Pad with 'A' characters to achieve a length of 6
    while (code.length < codeLength) {
      code = "A" + code;
    }

    return code;
  }

  // Function to decode a 6-character code back to a number
  function decodeCodeToNumber(code: string): number {
    const baseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let number = 0;
    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      const digitValue = baseChars.indexOf(char);
      number = number * baseChars.length + digitValue;
    }

    return number;
  }

  //   Function to decode a token and get the page number
  // function decodePageToken(token: string): number {
  //   const adjustedPage = parseInt(token, 10);
  //   const page = adjustedPage - BIG_NUMBER;
  //   return page;
  // }
}
