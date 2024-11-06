import { endOfDay, endOfMonth, endOfYear, startOfDay, startOfMonth, startOfYear } from "date-fns";

export const getDateRange = (date: string): { gte: Date; lte: Date } | null => {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
        const parts = date.split("-");
        if (parts.length === 3) {
            return {
                gte: startOfDay(parsedDate),
                lte: endOfDay(parsedDate),
            };
        } else if (parts.length === 2) {
            return {
                gte: startOfMonth(parsedDate),
                lte: endOfMonth(parsedDate),
            };
        } else if (parts.length === 1) {
            return {
                gte: startOfYear(parsedDate),
                lte: endOfYear(parsedDate),
            };
        }
    }
    return null;
};


