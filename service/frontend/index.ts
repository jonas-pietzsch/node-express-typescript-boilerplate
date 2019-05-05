const welcomePhrases = window.config.welcomePhrases

const app: HTMLElement = document.getElementById('app')!
app.innerHTML = welcomePhrases.map(phrase => `<h2>${phrase}</h2>`).join('')
