import { Request, Response } from 'express';
import { getCharacters } from './repository';

export async function getCharactersController(req: Request, res: Response) {
  const page = req.query.page || 1;
  const filter = req.query.filter || { species: 'Human' };

  try {
    const charactersRes = await getCharacters({ page: Number(page), filter });

    return res.status(200).json({
      ok: true,
      data: charactersRes,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      data: null,
      error: 'Ha ocurrido un error obteniendo personajes',
    });
  }
}
