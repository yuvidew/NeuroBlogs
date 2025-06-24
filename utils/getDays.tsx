export const getDateLabel = (dateString: string): string => {
    const inputDate = new Date(dateString);
    const now = new Date();

    // Normalize both dates to ignore time
    const input = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = today.getTime() - input.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
}
