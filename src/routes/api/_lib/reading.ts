
export const getReadingItem = async (topic: string) => {
    const response = await fetch("/api/v1/reading?" + new URLSearchParams({ topic }));
    const val = await response.json();
    return val ;
};