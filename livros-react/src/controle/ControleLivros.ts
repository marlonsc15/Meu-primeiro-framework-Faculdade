import Livro from "../modelo/Livro";

const livros: Array<Livro> = [
    {
        codEditora: 1, título: 'Use a cabeça: Java',
        codigo: 0,
        resumo: "Use a Cabeça! Java é uma experiência completa de apresendizado em programação orientada a objetos (OO) e Java.",
        autores: ["Bert Bates", "Kathy Sierra"]
    },
    {
        codEditora: 2, título: 'Java, como programar',
        codigo: 1,
        resumo: "Milhões de alunos e profissionais aprenderam programação e desenvolvimento de software com os livros Deitel",
        autores: ["Paul Deitel", "Harvey Deitel"]
    },
    {
        codEditora: 3, título: 'Core Java for the impatient',
        codigo: 2,
        resumo: "eaders familiar whith Horstmann's original, two-volume 'Core java' books who are looking for a comprehensive, but condensed guide to all of the new features and functions of java SE 9 will learn how these new features impact the language and core libraries.",
        autores: ["Cay Horstmann"]
    }
];

class ControleLivro {

    obterLivros(): Array<Livro> {
        return livros;
    }

    incluir(livro: Livro): void {
        const codMax = livros.length > 0 ? Math.max(...livros.map(l => l.codigo)) : 0;
        livro.codigo = codMax + 1;
        livros.push(livro);
    }

    excluir(codigo: number): boolean {
        const index = livros.findIndex(l => l.codigo === codigo);
        if (index !== -1) {
            livros.splice(index, 1);
            return true;
        }
        return false;
    }
}

export default ControleLivro;

