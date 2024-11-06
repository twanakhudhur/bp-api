import { Request, Response } from 'express';
import { createCountry, deleteCountry, getAllCountries, updateCountry } from '../../models/superAdmin/country.model';

// CREATE A NEW COUNTRY
const create = async (req: Request, res: Response) => {
    const newCountry = await createCountry(req.body);
    res.status(201).json(newCountry);
};

// GET ALL COUNTRIES
const getAll = async (req: Request, res: Response) => {
    const countries = await getAllCountries();
    res.status(200).json(countries);
}

// UPDATE A COUNTRY
const update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const updatedCountry = await updateCountry(id, data);
    res.status(200).json(updatedCountry);
}

// DELETE A COUNTRY
const deleteById = async (req: Request, res: Response) => {
    const id = req.params.id;
    await deleteCountry(id);
    res.status(204).end();
}

export default { create, getAll, update, deleteById };