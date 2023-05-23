
export const getReadingItems = async (topic: string) => {
    const response = await fetch("/api/v1/reading?" + new URLSearchParams({ topic }));
    const val = await response.json();
    return val;
};

export const getReadingItemById = async (id: string) => {
    const response = await fetch("/api/v1/reading?" + new URLSearchParams({ id }));
    const val = await response.json();
    return val;
}