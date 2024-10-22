import ControleEditora from "./controle/ControleEditora";
import ControleLivro from "./controle/ControleLivros";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const LivroDados = () => {
    const controleLivro = new ControleLivro();
    const controleEditora = new ControleEditora();

    const [título, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [opcoes, setOpcoes] = useState([]);
    const [codEditora, setCodEditora] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const editoras = controleEditora.getEditoras();
        const opcoesMapeadas = editoras.map(editora => ({
            value: editora.codEditora,
            text: editora.nome
        }));
        setOpcoes(opcoesMapeadas);

        if (opcoesMapeadas.length > 0) {
            setCodEditora(opcoesMapeadas[0].value);
        }
    }, []);

    const tratarCombo = (evento) => {
        setCodEditora(Number(evento.target.value));
    };

    const incluir = (evento) => {
        evento.preventDefault();
        const novoLivro = {
            codigo: 0,
            codEditora: codEditora,
            título: título,
            resumo: resumo,
            autores: autores.split('\n')
        };
        controleLivro.incluir(novoLivro);
        navigate('/livros');
    }

    return (
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
    )
}

export default LivroDados;