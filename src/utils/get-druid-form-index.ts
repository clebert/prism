import type { DruidForm } from "../dsl/druid-form";

// https://www.wowhead.com/classic/spell=768/cat-form
// https://www.wowhead.com/classic/spell=783/travel-form
// https://www.wowhead.com/classic/spell=1066/aquatic-form
// https://www.wowhead.com/classic/spell=5487/bear-form
// https://www.wowhead.com/classic/spell=9634/dire-bear-form
// https://www.wowhead.com/classic/spell=24858/moonkin-form

const spellIdsByDruidForm: Record<DruidForm, number[]> = {
  aquatic: [1066],
  bear: [5487, 9634],
  cat: [768],
  humanoid: [],
  moonkin: [24858],
  travel: [783],
} as const;

export function getDruidFormIndex(druidForm: DruidForm): number | undefined {
  const spellIds = spellIdsByDruidForm[druidForm];

  if (spellIds.length === 0) {
    return 0;
  }

  for (let index = 1; index <= GetNumShapeshiftForms(); index++) {
    const [, , , spellId] = GetShapeshiftFormInfo(index);

    if (spellIds.includes(spellId)) {
      return index;
    }
  }

  return;
}
