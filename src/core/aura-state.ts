export interface AuraState {
  readonly buffs: ReadonlyMap<number | string, Aura>;
  readonly debuffs: ReadonlyMap<number | string, Aura>;
  readonly ownBuffs: ReadonlyMap<number | string, Aura>;
  readonly ownDebuffs: ReadonlyMap<number | string, Aura>;
  readonly hasBlessing: boolean;
  readonly hasMagicBuff: boolean;
  readonly hasMagicDebuff: boolean;
  readonly hasSeal: boolean;
  readonly isCursed: boolean;
  readonly isDiseased: boolean;
  readonly isPoisoned: boolean;
}

export interface Aura {
  readonly count: number;
  readonly remainingTime: number;
}

const cache = new Map<string, { readonly auraState: AuraState; readonly time: number }>();

export function getAuraState(unitId: string): AuraState {
  const cacheEntry = cache.get(unitId);

  if (cacheEntry?.time === GetTime()) {
    return cacheEntry.auraState;
  }

  const buffs = new Map<number | string, Aura>();
  const debuffs = new Map<number | string, Aura>();
  const ownBuffs = new Map<number | string, Aura>();
  const ownDebuffs = new Map<number | string, Aura>();

  let hasBlessing = false;
  let hasMagicBuff = false;
  let hasMagicDebuff = false;
  let hasSeal = false;
  let isCursed = false;
  let isDiseased = false;
  let isPoisoned = false;

  for (const filter of ["HARMFUL", "HELPFUL"] as const) {
    let index = 1;

    while (true) {
      const [auraName, , count, dispelType, , expirationTime, source, , , spellId] = UnitAura(
        unitId,
        index,
        filter,
      );

      const aura: Aura = {
        count: count === 0 ? 1 : count,

        remainingTime:
          expirationTime !== undefined ? expirationTime - GetTime() : Number.POSITIVE_INFINITY,
      };

      if (!auraName) {
        break;
      }

      if (filter === "HARMFUL") {
        debuffs.set(auraName, aura);
        debuffs.set(spellId, aura);

        if (source === "player") {
          ownDebuffs.set(auraName, aura);
          ownDebuffs.set(spellId, aura);
        }

        switch (dispelType) {
          case "Curse": {
            isCursed = true;
            break;
          }
          case "Disease": {
            isDiseased = true;
            break;
          }
          case "Magic": {
            hasMagicDebuff = true;
            break;
          }
          case "Poison": {
            isPoisoned = true;
            break;
          }
        }
      } else {
        buffs.set(auraName, aura);
        buffs.set(spellId, aura);

        if (source === "player") {
          ownBuffs.set(auraName, aura);
          ownBuffs.set(spellId, aura);
        }

        // TODO: auraName is localized, English clients only
        if (source === "player" && auraName.includes("Blessing of ")) {
          hasBlessing = true;
        }

        // TODO: auraName is localized, English clients only
        if (source === "player" && auraName.startsWith("Seal of ")) {
          hasSeal = true;
        }

        if (dispelType === "Magic") {
          hasMagicBuff = true;
        }
      }

      index += 1;
    }
  }

  const auraState: AuraState = {
    buffs,
    debuffs,
    hasBlessing,
    hasMagicBuff,
    hasMagicDebuff,
    hasSeal,
    isCursed,
    isDiseased,
    isPoisoned,
    ownBuffs,
    ownDebuffs,
  };

  cache.set(unitId, { auraState, time: GetTime() });

  return auraState;
}
