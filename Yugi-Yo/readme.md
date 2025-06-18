# Yu-Gi-Oh! Jokenpo Edition

![Demonstração do Jogo](./docs/showcase.png)

Bem-vindo ao Yu-Gi-Oh! Jokenpo Edition, um jogo de cartas para navegador inspirado no universo de Yu-Gi-Oh!, mas com uma mecânica de duelo simples e viciante baseada em Pedra, Papel e Tesoura (Jokenpo).

## 🎯 Contexto do Projeto

Este projeto foi desenvolvido como um desafio prático do **Bootcamp de Front-End** da **[Digital Innovation One (DIO)](https://www.dio.me/)** em parceria com o **Santander**. O objetivo do desafio era aplicar os conhecimentos fundamentais de HTML, CSS e JavaScript para construir uma aplicação web interativa e funcional, demonstrando a capacidade de manipular o DOM e criar lógicas de jogo complexas.

## ✨ Funcionalidades Principais

O jogo conta com uma série de funcionalidades para criar uma experiência dinâmica e estratégica:

### Lógica do Jogo

- **Sistema de Duelo Jokenpo**: O núcleo do jogo é baseado na clássica regra Pedra-Papel-Tesoura.
- **Baralho de Cartas**: Um conjunto de 8 cartas icônicas de Yu-Gi-Oh!.
- **Seleção de Cartas**: A cada rodada, 5 cartas aleatórias são sorteadas.
- **Sistema de Rodadas**: Uma partida padrão consiste em 5 rodadas.
- **Contador de Cartas Viradas**: A rodada avança automaticamente após 5 cartas viradas.
- **Vitória Antecipada**: O jogador vence imediatamente se alcançar 4 vitórias.

### Inteligência Artificial (IA)

- **IA Estratégica**: O computador tem 80% de chance de escolher uma carta de tipo diferente.
- **Probabilidade de Empate Controlada**: A chance de um empate é controlada para ser de apenas 5%.

### Regras Especiais

- **Sistema de Desempate (Tie-Breaker)**: Se a partida terminar empatada, duas rodadas extras de "Morte Súbita" são adicionadas.
- **Garantia de Vencedor**: Na última rodada do desempate, empates não são permitidos.

### Interface e Experiência do Usuário (UI/UX)

- **Feedback Visual Imediato**: Animações de virar cartas.
- **Botões Dinâmicos**: O botão de resultado muda de cor e texto (Verde para vitória, Vermelho para derrota, Roxo para empate).
- **Controles de Jogo**: Botões para avançar ou reiniciar a rodada.
- **Design Temático**: Interface com estilo RPG e do universo de Yu-Gi-Oh!.
- **Resposta Rápida da IA**: O tempo de resposta do computador é ágil.

## 🛠️ Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**

## 🚀 Como Executar o Projeto

1.  Certifique-se de que o XAMPP está instalado e o serviço **Apache** está em execução.
2.  Coloque a pasta do projeto (`Yugi-Yo`) dentro do diretório `htdocs`.
3.  Abra seu navegador e acesse: `http://localhost/Yugi-Yo/`

## 📁 Estrutura do Projeto

```
Yugi-Yo/
├── docs/
│   └── showcase.png          # Sua imagem de demonstração fica aqui
├── index.html
└── src/
    ├── assets/
    │   ├── icons/
    │   ├── rpg/
    │   └── video/
    ├── scripts/
    │   └── engine.js
    └── styles/
        ├── main.css
        ├── reset.css
        ├── buttons.css
        └── containers_and_frames.css
```

---

Feito por Vandyck Diniz
