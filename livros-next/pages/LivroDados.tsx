import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Menu } from '@/componentes/Menu';
import { useRouter } from 'next/router';
import ControleEditora from '@/classes/controle/ControleEditora';
import Livro from '@/classes/modelo/Livro';

const baseURL: string = "http://localhost:3000/api/livros";
const controleEditora = new ControleEditora();

const incluirLivro = async (livro: Livro): Promise<boolean> => {
    const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(livro),
    });
    return response.ok;
};

const LivroDados: React.FC = () => {
    const [título, setTitulo] = useState<string>('');
    const [resumo, setResumo] = useState<string>('');
    const [autores, setAutores] = useState<string>('');
    const [codEditora, setCodEditora] = useState<number>(0);
    const [opcoes, setOpcoes] = useState<{ value: number; text: string }[]>([]);
    const router = useRouter();

    useEffect(() => {
        const editoras = controleEditora.getEditoras();
        const opcoesEditoras = editoras.map((editora) => ({
            value: editora.codEditora,
            text: editora.nome,
        }));
        setOpcoes(opcoesEditoras);
    }, []);

    const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(event.target.value));
    };

    const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const livro: Livro = {
            codigo: 0,
            codEditora,
            título,
            resumo,
            autores: autores.split('\n'),
        };
        const sucesso = await incluirLivro(livro);
        if (sucesso) {
            router.push('/LivroLista');
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Incluir Livro</title>
                <meta name="description" content="Formulário para inclusão de um novo livro" />
            </Head>
            <Menu />
            <main>
                <h1 className="d-flex justify-content-start mx-5">Dados do Livro</h1>
                <form onSubmit={incluir} className="mx-5">
                    <div className="mb-3">
                        <label htmlFor="título" className="form-label d-flex justify-content-start">Título</label>
                        <input
                            type="text"
                            id="título"
                            className="form-control"
                            value={título}
                            onChange={(evento) => setTitulo(evento.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="resumo" className="d-flex justify-content-start" >Resumo</label>
                        <textarea
                            id="resumo"
                            className="form-control "
                            value={resumo}
                            onChange={(evento) => setResumo(evento.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="editora" className="form-label d-flex justify-content-start">Editora</label>
                        <select
                            id="editora"
                            className="form-select"
                            value={codEditora}
                            onChange={tratarCombo}
                        >
                            {opcoes.map((opcao) => (
                                <option key={opcao.value} value={opcao.value}>
                                    {opcao.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="autores" className="form-label d-flex justify-content-start">Autores (1 por linha)</label>
                        <textarea
                            id="autores"
                            className="form-control"
                            value={autores}
                            onChange={(evento) => setAutores(evento.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary d-flex justify-content-start">Salvar Dados</button>
                </form>
            </main>
        </div>
    );
};

export default LivroDados;
