import type { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { codEditora } = req.query;

        if (req.method === 'GET') {
            if (!codEditora) {
                res.status(400).json({ error: 'Código da editora não fornecido.' });
                return;
            }

            const codigo = Number(codEditora); // Convertendo para número
            const nomeEditora = controleEditora.getNomeEditora(codigo);

            if (!nomeEditora) {
                res.status(404).json({ error: 'Editora não encontrada.' });
                return;
            }
            res.status(200).json({ nome: nomeEditora });
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).json({ error: `Método ${req.method} não permitido.` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor, tente novamente mais tarde.' });
    }
};
