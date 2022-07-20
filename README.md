# RU API UFV

API REST feita para expor o cardápio dos Restaurantes Universitários da UFV em forma de API. O app foi feito utilizando [NodeJS](https://nodejs.org/en/) e a raspagem de dadosfoi feita utilizando a biblioteca [Puppeteer](https://github.com/puppeteer/puppeteer).

> **IMPORTANTE:** Projeto feito para fins didáticos.

## Funcionalidades

Expõe os cardápios da UFV em duas rotas GET:
- /vicosa
- /crp

As rotas retornam um JSON contendo a lista de refeições daquele campus no dia.

## 🚀 Começando

### 1. Primeiro passo

Você vai precisar dos seguintes softwares instalados no seu sistema:
- NodeJS
- Typescript Compiler (tsc)
- Git

Após isso, clone o repositório e vá até a pasta recém clonada:

```
git clone https://github.com/lucasjoviniano/ru-api.git&& cd ru-api
```

Com isso feito, é necessário instalar as dependências do node, execute o comando:

```
npm install
```

Com isso feito, é só testar a aplicação! No seu terminal, execute:

```
npm run dev
```

E pronto! A API estará rodando em `localhost:8000`.

## 🤝 Contribua

Sua ajuda é muito bem-vinda, independente da forma! Confira o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para conhecer todas as formas de contribuir com o projeto. Por exemplo, sugerir uma nova funcionalidade, reportar um problema/bug, enviar um pull request, ou simplemente utilizar o projeto e comentar sua experiência.

Lembre - se que as contribuições devem seguir nosso [Código de Conduta](CODE_OF_CONDUCT.md).

## Licença

Esse projeto é licenciado nos termos da licença open-source [MIT](https://choosealicense.com/licenses/mit).
