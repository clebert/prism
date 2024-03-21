export type CreatureType = (typeof creatureTypes)[number];

const creatureTypes = [
  "beast",
  "critter",
  "demon",
  "dragonkin",
  "elemental",
  "giant",
  "humanoid",
  "mechanical",
  "totem",
  "undead",
] as const;

export function isCreatureType(value: string): value is CreatureType {
  return creatureTypes.includes(value as CreatureType);
}
