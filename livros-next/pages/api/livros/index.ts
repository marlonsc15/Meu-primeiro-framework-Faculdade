import ControleLivro from '@/classes/controle/ControleLivros';
import type { NextApiRequest, NextApiResponse } from 'next';

export const controleLivro = new ControleLivro();

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            const livros = controleLivro.obterLivros();
            res.status(200).json(livros);
        }
        else if (req.method === 'POST') {
            const livro = req.body;
            controleLivro.incluir(livro);
            res.status(200).json({ message: 'Livro incluído com sucesso.' });
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).json({ error: `Método ${req.method} não permitido.` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor, tente novamente mais tarde.' });
    }
};
