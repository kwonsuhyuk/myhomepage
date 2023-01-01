const quotes = [
  {
    quotes: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
  },
  {
    quotes:
      "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe",
    author: "Albert Einstein",
  },
  {
    quotes: "So many books, so little time",
    author: "Frank Zappa",
  },
  {
    quotes: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero",
  },
  {
    quotes:
      "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
    author: "Bernard M. Baruch",
  },
  {
    quotes:
      "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    author: "Dr.seuss",
  },
  {
    quotes: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
  },
  {
    quotes: "Be the change that you wish to see in the world.",
    author: "Mahatma Gandhi",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

// round, ceil , floor 반올림 올림 내림
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quotes;
author.innerText = todaysQuote.author;
