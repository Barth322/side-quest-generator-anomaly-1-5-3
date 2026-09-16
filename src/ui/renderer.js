const fields = [
  ['Заказчик', 'customer'], ['Место', 'location'], ['Сюжетная завязка', 'hook'],
  ['Основная цель', 'objective'], ['Возможная развязка', 'resolution'], ['Награда', 'reward']
];

export function renderQuest(quest) {
  document.querySelector('#quest-type').textContent = quest.type.toUpperCase();
  document.querySelector('#quest-title').textContent = quest.title;
  document.querySelector('#quest-details').replaceChildren(...fields.map(([label, key]) => {
    const row = document.createElement('div'); const term = document.createElement('dt'); const value = document.createElement('dd');
    term.textContent = label; value.textContent = quest[key]; row.append(term, value); return row;
  }));
}

export function questToText(quest) {
  return [`${quest.title} (${quest.type})`, `Заказчик: ${quest.customer}`, `Место: ${quest.location}`, '', `Завязка: ${quest.hook}`, `Цель: ${quest.objective}`, `Развязка: ${quest.resolution}`, `Награда: ${quest.reward}`].join('\n');
}

