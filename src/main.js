import { QuestGenerator } from './generator/questGenerator.js';
import { questToText, renderQuest } from './ui/renderer.js';

const generator = new QuestGenerator();
const generateButton = document.querySelector('#generate-button');
const copyButton = document.querySelector('#copy-button');
const copyStatus = document.querySelector('#copy-status');
let currentQuest;

function generateQuest() { currentQuest = generator.generate(); renderQuest(currentQuest); copyButton.disabled = false; copyStatus.textContent = ''; }
generateButton.addEventListener('click', generateQuest);
copyButton.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(questToText(currentQuest)); copyStatus.textContent = 'Квест скопирован в буфер.'; }
  catch { copyStatus.textContent = 'Не удалось скопировать. Выделите текст вручную.'; }
});
generateQuest();

