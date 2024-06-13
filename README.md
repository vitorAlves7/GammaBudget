# GammaBudget



Este repositório é destinado ao Front-end da aplicação GammaBudget


## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

## Passos 

Siga os passos abaixo para clonar, construir e executar o Frontend do GammaBudget

### 1. Clonar o Repositório

Primeiro, clone este repositório para sua máquina local usando o Git.

```
git clone https://gitlab.com/gama-budget/GammaBudget.git
cd GammaBudget
```


### 2.  Construir Imagem Docker

```
docker build -t frontend .
```


### 3.  Executar o Contêiner 

```
docker run -p 4200:4200 frontend
```

### 4.  Acessar o Projeto

```
http://localhost:4200
```




