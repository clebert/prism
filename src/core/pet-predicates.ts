import type { PetPredicates } from "../dsl/predicate-registry";

export const petPredicates: PetPredicates = {
  happy(): boolean {
    const happiness = GetPetHappiness();

    return happiness !== undefined && happiness >= 3;
  },
};
