//Cotações de moedas do dia
const USD = 4.87 
const EUR = 5.32
const GBP = 6.08 

// Obtendo os elementos do DOM.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "");
})

// Captando o evento de submit do form.
form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
}

// Função para converter o valor.
function convertCurrency(amount, price, symbol){
  try {
    // Exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol}1 = ${formatCurrencyBRL(price)}`

    // Calcula o total
    let total = amount * price

    if (isNaN(total)) {
      return alert("Por favor, insira um valor válido.");
    }
    
    // Formata o total para a moeda em reais (BRL).
    total = formatCurrencyBRL(total).replace("R$", "")

    // Exibe o resultado total.
    result.textContent = total
    
    // Aplica a classe que exibe o resultado.
    footer.classList.add("show-result");
  } catch (error) {
    console.error(error);
    
    // Remove a classe que exibe o resultado.
    footer.classList.remove("show-result");
    alert("Ocorreu um erro ao converter a moeda.");
  }
}

// Formata a moeda em reais (BRL).
function formatCurrencyBRL(value) {
  // Converte primeiro para numero para dps usar o toLocaleString.
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}