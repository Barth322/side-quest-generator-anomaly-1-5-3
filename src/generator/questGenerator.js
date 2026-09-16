import { characters } from '../data/characters.js';
import { locations } from '../data/locations.js';
import { rewards } from '../data/rewards.js';
import { questTemplates } from '../data/quests.js';

const pick = (items, random) => items[Math.floor(random() * items.length)];

export class QuestGenerator {
  constructor(random = Math.random) { this.random = random; this.usedTemplateIds = new Set(); }

  generate() {
    let available = questTemplates.filter((template) => !this.usedTemplateIds.has(template.id));
    if (!available.length) { this.usedTemplateIds.clear(); available = questTemplates; }
    const template = pick(available, this.random);
    this.usedTemplateIds.add(template.id);
    const customer = pick(characters.filter((character) => template.roles.some((role) => character.roles.includes(role))), this.random);
    const location = pick(locations.filter((place) => template.tags.some((tag) => place.tags.includes(tag))), this.random);
    const reward = pick(rewards.filter((item) => item.types.includes(template.rewardType)), this.random);
    return { id: template.id, title: template.title, type: template.type, customer: customer.name, location: location.name, hook: template.hook, objective: template.objective, resolution: template.resolution, reward: reward.text };
  }
}

