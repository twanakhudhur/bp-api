import { Response } from "express";


export const customError = (res: Response, status: number, path: string, message: string) => {
    return res.status(status).json({
        path,
        message,
    });
};


export const existError = (res: Response, path: string, message: string) => {
    return res.status(409).json({
        path,
        message,
    });
};

export const notFoundError = (res: Response, path: string, message: string) => {
    return res.status(404).json({
        path,
        message,
    });
};
