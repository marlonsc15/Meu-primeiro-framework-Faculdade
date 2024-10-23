import ControleEditora from '@/classes/controle/ControleEditora';
import type { NextApiRequest, NextApiResponse } from 'next';

export const controleEditora = new ControleEditora();

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const editoras = controleEditora.getEditoras();
      res.status(200).json(editoras);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: `Método ${req.method} não permitido.` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor, tente novamente mais tarde.' });
  }
};
