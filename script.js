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

listaTags.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('remove-tag')) {
        let tagRemovida = evento.target.parentElement
        listaTags.removeChild(tagRemovida)
    }
})

let tagsDisponiveis = ['Tecnologia', 'HTML', 'CSS', 'JavaScript', 'Programação', 'Front-end']

async function verificarTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto))
        }, 1000)
    })
}

inputTag.addEventListener('keypress', async (evento) => {
    if (evento.key === 'Enter') {
        evento.preventDefault()
        let tagTexto = inputTag.value.trim()
        if (tagTexto !== '') {
        try {
            let tagExiste = await verificarTagsDisponiveis(tagTexto)
            if (tagExiste) {
                let tagNova = document.createElement('li')
                tagNova.innerHTML = `<p>${tagTexto}</p> <img src="imagens/close-black.svg" class="remove-tag">`
                listaTags.appendChild(tagNova)
                inputTag.value = ''
            } else {
                alert('Essa tag não está disponível.')
            }
        } catch (error) {
            console.error('Erro ao verificar a existência da tag.')
        }
        }
    }
})

const botaoPublicar = document.querySelector('.botao-publicar')

botaoPublicar.addEventListener('click', async (evento) => {
    evento.preventDefault()
    const tituloDaFoto = document.getElementById('nome').value
    const descricaoDaFoto = document.getElementById('descricao').value
    const tagsDaFoto = Array.from(listaTags.querySelectorAll('p')).map((tag) => tag.textContent)

    try {
        const mensagem = await publicarProjeto(tituloDaFoto, descricaoDaFoto, tagsDaFoto)
        console.log(mensagem)
        alert(mensagem)
    } catch (error) {
        console.error(error)
        alert(error)
    }
})

async function publicarProjeto(tituloDaFoto, descricaoDaFoto, tagsDaFoto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;
            if (deuCerto) {
                resolve('Projeto publicado com sucesso!')
            } else {
                reject('Erro ao publicar o projeto.')
            }
        }, 2000)
    })
}