
import React, { useState, useEffect } from 'react';
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const LinhaLivro = ({ livro, excluir }) => {
    const controleEditora = new ControleEditora();
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            <td>
                <ul className='list-group'>
                    <li style={{ listStyle: 'none' }}>{livro.título}</li>
                    <li style={{ listStyle: 'none' }}><button className='btn btn-danger' onClick={() => excluir(livro.codigo)}>Excluir</button></li>
                </ul>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>

            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        const controleLivros = new ControleLivros();
        setLivros(controleLivros.obterLivros());
        setCarregado(true);
    }, []);

    const excluir = (codigo) => {
        const controleLivros = new ControleLivros();
        controleLivros.excluir(codigo);
        setLivros(livros.filter(livro => livro.codigo !== codigo));
        setCarregado(false);
    };
    return (
        <main className='mx-5'>
            <h1 className='mx-5 d-flex justify-content-start'>Catalogo de Livros</h1>
            <table className='table table-striped'>
                <thead className='table-dark'>
                    <tr>
                        <th >Título</th>
                        <th>Resumo</th>
                        <th>Editora</th>
                        <th>Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map(livro => (
                        <LinhaLivro
                            key={livro.codLivro}
                            livro={livro}
                            excluir={excluir}
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;
