Exemplo de arquitetura em camadas com NodeJS
===
> Aplicação desenvolvida durante live do canal do [Training Center](trainingcenter.io) para demonstrar o uso de camadas em aplicações web NodeJS

- [Exemplo de arquitetura em camadas com NodeJS](#exemplo-de-arquitetura-em-camadas-com-nodejs)
- [Arquitetura utilizada](#arquitetura-utilizada)
  - [Material relacionado](#material-relacionado)
- [Executando a aplicação](#executando-a-aplica%C3%A7%C3%A3o)
- [Ferramentas úteis](#ferramentas-%C3%BAteis)

# Arquitetura utilizada

A arquitetura demonstrada durante a live utiliza, como base, os conceitos do MVC e do DDD para criar um design que permite manutenção e evolução rápida enquanto mantém a organização e limpeza do código. Além disso, a aplicação conta com uma entidade que utiliza o padrão de event sourcing para controlar e manipular seu estado.

## Material relacionado
- [Livestream do desenvolvimento desta aplicação](https://www.youtube.com/watch?v=VpUt7u-oA5c)
- [Tardis - A Nodejs library to control time](https://github.com/nxcd/tardis)
- [Paradox - A Nodejs library to aid event sourcing apps](https://github.com/nxcd/paradox)
- [O que é Event Sourcing](https://speakerdeck.com/khaosdoctor/controlando-o-tempo-com-typescript-e-event-sourcing)
- [Guia de bolso do desenvolvedor da NXCD](https://github.com/nxcd/developer-handbook)
- [Artigo sobre esta arquitetura](https://imasters.com.br/back-end/event-sourcing-desenvolvendo-sua-primeira-aplicacao/)

# Executando a aplicação
Esta aplicação utiliza Docker Compose como runner. Ele irá realizar o build e a configuração de todos os containers necessários. Para isso, basta executar `docker-compose up` na pasta raiz.

Alterantivamente, pode-se executar `pnpm install` (depende do [pnpm](https://www.npmjs.com/package/pnpm)) na pasta raiz e, depois, executar `pnpm run start:debug`, para iniciar a aplicação com *hot reloading*.

Por padrão, tanto utilizando docker compose quanto utilizando os scripts do `package.json`, o servidor ouvirá na porta `3000`.

# Ferramentas úteis
- [Doctor](https://github.com/nxcd/doctor)
- [Next](https://github.com/nxcd/next)
