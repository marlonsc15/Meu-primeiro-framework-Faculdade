import type { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { codigo } = req.query;

        if (req.method === 'DELETE') {
            if (!codigo) {
                res.status(400).json({ error: 'Código do livro não fornecido.' });
                return;
            }

            const codigoNumero = Number(codigo);
            controleLivro.excluir(codigoNumero);
            res.status(200).json({ message: 'Livro excluído com sucesso.' });
        } else {
            res.setHeader('Allow', ['DELETE']);
            res.status(405).json({ error: `Método ${req.method} não permitido.` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor, tente novamente mais tarde.' });
    }
};
