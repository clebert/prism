import type { ComparisonFunction } from "./comparison-function";
import type { CreatureType } from "./creature-type";
import type { DruidForm } from "./druid-form";
import type { EquipmentType } from "./equipment-type";
import type { Duration, Percentage, Unit } from "./parser";

export interface PredicateRegistry {
  readonly pet: PetPredicates;
  readonly player: PlayerPredicates;
  readonly universal: UniversalPredicates;
}

export interface PetPredicates {
  // Happiness
  happy(): boolean;
}

export interface PlayerPredicates {
  // Movement
  falling(duration: ComparisonFunction<Duration> | undefined): boolean;
  mounted(): boolean;
  running(duration: ComparisonFunction<Duration> | undefined): boolean;
  swimming(): boolean;
  submerged(): boolean;

  // Environment
  grouped(): boolean;
  indoors(): boolean;
  outdoors(): boolean;
  resting(): boolean;

  // Equipment & Form
  equipped(type: EquipmentType): boolean;
  form(number: ComparisonFunction<number>): boolean;
  stance(number: ComparisonFunction<number>): boolean;
  stealthed(): boolean;

  // Talents
  talent(talentName: string, rank: ComparisonFunction<number> | undefined): boolean;

  // Combat Actions
  autoShooting(): boolean;
  meleeAttacking(): boolean;

  // Resources
  ammo(amount: ComparisonFunction<number> | undefined): boolean;

  // Inventory
  itemCount(itemId: number, amount: ComparisonFunction<number>): boolean;

  // Class-Specific
  canShiftBackFrom(actionSlotId: number, target: DruidForm): boolean;
  canShiftInto(actionSlotId: number, target: DruidForm): boolean;
  druidForm(target: DruidForm): boolean;
  rageSafe(): boolean;

  // Ability State
  usable(actionSlotId: number): boolean;
}

export interface UniversalPredicates {
  // Existence
  alive(unit: Unit): boolean;
  dead(unit: Unit): boolean;
  existing(unit: Unit): boolean;
  missing(unit: Unit): boolean;

  // Auras
  buff(
    unit: Unit,
    auraName: string,
    count: ComparisonFunction<number> | undefined,
    duration: ComparisonFunction<Duration> | undefined,
  ): boolean;

  ownBuff(
    unit: Unit,
    auraName: string,
    count: ComparisonFunction<number> | undefined,
    duration: ComparisonFunction<Duration> | undefined,
  ): boolean;

  debuff(
    unit: Unit,
    auraName: string,
    count: ComparisonFunction<number> | undefined,
    duration: ComparisonFunction<Duration> | undefined,
  ): boolean;

  ownDebuff(
    unit: Unit,
    auraName: string,
    count: ComparisonFunction<number> | undefined,
    duration: ComparisonFunction<Duration> | undefined,
  ): boolean;

  // Dispellable Auras
  cursed(unit: Unit): boolean;
  diseased(unit: Unit): boolean;
  magicBuff(unit: Unit): boolean;
  magicDebuff(unit: Unit): boolean;
  poisoned(unit: Unit): boolean;

  // Resources
  energy(unit: Unit, amount: ComparisonFunction<number>): boolean;
  health(unit: Unit, percentage: ComparisonFunction<Percentage>): boolean;
  mana(unit: Unit, percentage: ComparisonFunction<Percentage>): boolean;
  rage(unit: Unit, amount: ComparisonFunction<number>): boolean;

  // Combat State
  attacking(unit: Unit, targetUnitId: string): boolean;
  casting(unit: Unit): boolean;
  combat(unit: Unit): boolean;
  comboPoints(unit: Unit, points: ComparisonFunction<number>): boolean;
  targeting(unit: Unit, targetUnitId: string): boolean;
  trivial(unit: Unit): boolean;

  // Recent Actions
  blocked(unit: Unit): boolean;
  dodged(unit: Unit): boolean;
  parried(unit: Unit): boolean;

  // Unit Type
  bleedable(unit: Unit): boolean;
  creature(unit: Unit, type: CreatureType): boolean;
  elite(unit: Unit): boolean;
  harm(unit: Unit): boolean;
  help(unit: Unit): boolean;
  is(unit: Unit, targetUnitId: string): boolean;
  level(unit: Unit, level: ComparisonFunction<number>): boolean;
  npc(unit: Unit): boolean;
  partyMember(unit: Unit): boolean;
}

export function createMockRegistry(overrides?: {
  pet?: Partial<PetPredicates>;
  player?: Partial<PlayerPredicates>;
  universal?: Partial<UniversalPredicates>;
}): PredicateRegistry {
  const defaultRegistry: PredicateRegistry = {
    pet: {
      happy: () => false,
    },
    player: {
      ammo: () => false,
      autoShooting: () => false,
      canShiftBackFrom: () => false,
      canShiftInto: () => false,
      druidForm: () => false,
      equipped: () => false,
      falling: () => false,
      form: () => false,
      grouped: () => false,
      indoors: () => false,
      itemCount: () => false,
      meleeAttacking: () => false,
      mounted: () => false,
      outdoors: () => false,
      rageSafe: () => false,
      resting: () => false,
      running: () => false,
      stance: () => false,
      stealthed: () => false,
      submerged: () => false,
      swimming: () => false,
      talent: () => false,
      usable: () => false,
    },
    universal: {
      alive: () => false,
      attacking: () => false,
      bleedable: () => false,
      blocked: () => false,
      buff: () => false,
      casting: () => false,
      combat: () => false,
      comboPoints: () => false,
      creature: () => false,
      cursed: () => false,
      dead: () => false,
      debuff: () => false,
      diseased: () => false,
      dodged: () => false,
      elite: () => false,
      energy: () => false,
      existing: () => false,
      harm: () => false,
      health: () => false,
      help: () => false,
      is: () => false,
      level: () => false,
      magicBuff: () => false,
      magicDebuff: () => false,
      mana: () => false,
      missing: () => false,
      npc: () => false,
      ownBuff: () => false,
      ownDebuff: () => false,
      parried: () => false,
      partyMember: () => false,
      poisoned: () => false,
      rage: () => false,
      targeting: () => false,
      trivial: () => false,
    },
  };

  if (!overrides) {
    return defaultRegistry;
  }

  const { pet, player, universal } = defaultRegistry;

  return {
    pet: overrides.pet ? { ...pet, ...overrides.pet } : pet,
    player: overrides.player ? { ...player, ...overrides.player } : player,
    universal: overrides.universal ? { ...universal, ...overrides.universal } : universal,
  };
}
