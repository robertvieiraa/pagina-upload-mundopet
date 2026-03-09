const uploadBtn = document.getElementById('upload-btn')
const inputUpload = document.getElementById('image-upload')

uploadBtn.addEventListener('click', () => {
    inputUpload.click()
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader()
        leitor.onload = () => {
            resolve( {url: leitor.result, nome: arquivo.name} )
        }
        leitor.onerror = () => {
            reject(`O arquivo ${arquivo.name} não pôde ser lido.`)
        }
        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector('.main-imagem')
const nomeDaImagem = document.querySelector('.container-nome-imagem p')

inputUpload.addEventListener('change', async (evento) => {
    const arquivo = evento.target.files[0]
    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo)
            imagemPrincipal.src = conteudoDoArquivo.url
            nomeDaImagem.textContent = conteudoDoArquivo.nome
        } catch (erro) {
            console.error('Houve um erro ao carregar o arquivo.')
        }
    }
})

let listaTags = document.getElementById('lista-tags')
let inputTag = document.getElementById('categorias')

document.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        evento.preventDefault()
        let tagTexto = inputTag.value.trim()
        if (tagTexto !== '') { // validação
        let tagNova = document.createElement('li')
        tagNova.innerHTML = `<p>${tagTexto}</p> <img src="imagens/close-black.svg">`
        listaTags.appendChild(tagNova)
        inputTag.value = ''
        }
    }
})