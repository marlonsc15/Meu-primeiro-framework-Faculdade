import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { LinhaLivro } from '@/componentes/LinhaLivro';
import Livro from '@/classes/modelo/Livro';
import { Menu } from '@/componentes/Menu';


const baseURL: string = "http://localhost:3000/api/livros";

const obterLivros = async (): Promise<Livro[]> => {
    const response = await fetch(baseURL);
    return response.json();
};

const excluirLivro = async (codigo: number): Promise<boolean> => {
    const response = await fetch(`${baseURL}/${codigo}`, {
        method: 'DELETE',
    });
    return response.ok;
};

const LivroLista: React.FC = () => {
    const [livros, setLivros] = useState<Array<Livro>>([]);
    const [carregado, setCarregado] = useState<boolean>(false);

    useEffect(() => {
        obterLivros().then((data) => {
            setLivros(data);
            setCarregado(true);
        });
    }, []);

    const excluir = async (codigo: number) => {
        const sucesso = await excluirLivro(codigo);
        if (sucesso) {
            setLivros(livros.filter((livro) => livro.codigo !== codigo));
        }
        setCarregado(false);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Lista de Livros</title>
                <meta name="description" content="Lista de livros disponíveis" />
            </Head>
            <Menu />
            <main>
                <h1 className='mx-5 d-flex justify-content-start'>Catálogo de Livros</h1>
                <table className='table table-striped'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Título</th>
                            <th>Resumo</th>
                            <th>Editora</th>
                            <th>Autores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro) => (
                            <LinhaLivro
                                key={livro.codigo}
                                livro={livro}
                                excluir={excluir}
                            />
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default LivroLista;
