import Editora from '../modelo/Editora';

const editoras: Array<Editora> = [
  { codEditora: 1, nome: 'Alta Books' },
  { codEditora: 2, nome: 'Pearson' }, 
  { codEditora: 3, nome: 'Addison Wesley' }
];

class ControleEditora {

  getEditoras(): Array<Editora> {
    return editoras;
  }

  getNomeEditora(codEditora: number): string | undefined {
    const editoraEncontrada = editoras.filter(e => e.codEditora === codEditora);
    return editoraEncontrada.length > 0 ? editoraEncontrada[0].nome : undefined;
  }
}

export default ControleEditora;