export type EquipmentType = (typeof equipmentTypes)[number];

const equipmentTypes = ["dagger", "meleeWeapon", "shield"] as const;

export function isEquipmentType(value: string): value is EquipmentType {
  return equipmentTypes.includes(value as EquipmentType);
}
