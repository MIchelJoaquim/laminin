import { Request, Response } from 'express';

import { Market } from '../constants';
import marketModel from '../models/market.model';
import { errorResponse, removeExtraAspas } from './utils';

export const createMarket = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const market = await marketModel.create({
            [Market.name]: name,
        });

        res.status(201).json({
            msg: 'Mercado cadastrado!',
            payload: {
                market,
            },
            count: 1,
        });
    } catch (error) {
        errorResponse(res, error.message);
    }
};

export const readAllMarket = async (req: Request, res: Response) => {
    const nameIn = removeExtraAspas((req.query.name as string) || '');
    try {
        const markets = await marketModel
            .find({ name: { $regex: new RegExp(nameIn), $options: 'i' } }, { __v: 0 })
            .exec();

        const marketsSend = markets.map(market => ({
            id: market._id,
            name: market.name
        }));
        res.status(200).json({
            msg: '',
            payload: {
                data: marketsSend,
            },
            count: markets.length,
        });
    } catch (error) {
        errorResponse(res, error.message);
    }
};