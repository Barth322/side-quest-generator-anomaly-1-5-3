import test from 'node:test';
import assert from 'node:assert/strict';
import { QuestGenerator } from '../src/generator/questGenerator.js';
import { questTypes, questTemplates } from '../src/data/quests.js';
import { rewards } from '../src/data/rewards.js';

const requiredFields = ['id', 'title', 'type', 'customer', 'location', 'hook', 'objective', 'resolution', 'reward'];

test('генератор возвращает заполненный квест с обязательными полями', () => {
  const quest = new QuestGenerator().generate();
  requiredFields.forEach((field) => assert.ok(quest[field], `отсутствует ${field}`));
});

test('генератор выдаёт только объявленные типы квестов', () => {
  const generator = new QuestGenerator();
  for (let index = 0; index < 100; index += 1) assert.ok(questTypes.includes(generator.generate().type));
});

test('связанные поля всегда берутся из одного сюжетного шаблона', () => {
  const generator = new QuestGenerator();
  for (let index = 0; index < 100; index += 1) {
    const quest = generator.generate(); const template = questTemplates.find((item) => item.id === quest.id);
    assert.equal(quest.title, template.title); assert.equal(quest.objective, template.objective); assert.equal(quest.resolution, template.resolution);
  }
});

test('генерация не ломается при длительной серии и не повторяет шаблон до полного цикла', () => {
  const generator = new QuestGenerator(); const firstCycle = Array.from({ length: questTemplates.length }, () => generator.generate().id);
  assert.equal(new Set(firstCycle).size, questTemplates.length);
  assert.doesNotThrow(() => Array.from({ length: 500 }, () => generator.generate()));
});

test('награда имеет корректный формат и соответствует типу шаблона', () => {
  const generator = new QuestGenerator();
  for (let index = 0; index < 100; index += 1) {
    const quest = generator.generate(); const template = questTemplates.find((item) => item.id === quest.id);
    const reward = rewards.find((item) => item.text === quest.reward);
    assert.ok(reward); assert.ok(reward.types.includes(template.rewardType)); assert.match(quest.reward, /RU|тайник|ремонт|боеприпасы|детектор|комбинезон|артефакт|АКС|инструментов|проводника/);
  }
});

