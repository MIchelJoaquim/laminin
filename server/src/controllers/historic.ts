import { Request, Response } from 'express';

import { Historic } from '../constants';
import historicModel from '../models/historic.model';
import { errorResponse, removeExtraAspas } from './utils';

export const createHistoric = async (req: Request, res: Response) => {
    const { marketId, productName, productPrice } = req.body;
    try {
        const historic = await historicModel.create({
            [Historic.market]: marketId,
            [Historic.productName]: productName,
            [Historic.productPrice]: productPrice
        });

        res.status(201).json({
            msg: 'Mercado cadastrado!',
            payload: {
                data: historic,
            },
            count: 1,
        });
    } catch (error) {
        errorResponse(res, error.message);
    }
};

export const readAllHistoric = async (req: Request, res: Response) => {
    try {

        const historic = await historicModel.aggregate([
            { $lookup: { from: 'markets', localField: 'market', foreignField: '_id', as: 'market' } },
            {
                $unwind: '$market',
            },
        ]);

        res.status(200).json({
            msg: '',
            payload: {
                data: historic,
            },
            count: historic.length,
        });
    } catch (error) {
        errorResponse(res, error.message);
    }
};