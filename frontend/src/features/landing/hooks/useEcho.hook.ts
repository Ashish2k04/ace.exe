import { askEcho } from "../api/echo.api";

export const useEcho = () => {
  async function handleEcho(question: string) {
    const response = await askEcho(question);
    console.log(response?.aiResponse);
    const data = response?.aiResponse;

    if (Array.isArray(data)) {
      return data
        .map((item) => (typeof item === 'string' ? item : item?.text || ''))
        .join('');
    }

    if (typeof data === 'string') {
      return data;
    }

    if (data && typeof data === 'object') {
      return (data as { text?: string }).text || '';
    }

    return '';
  }

  return { handleEcho };
};
