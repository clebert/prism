export function getTalentRank(
  talentName: "Improved Mend Pet" | "Improved Overpower" | "Tactical Mastery",
): number {
  switch (talentName) {
    case "Improved Mend Pet": {
      const [, iconTexture, , , rank] = GetTalentInfo(1, 4);

      if (iconTexture !== 132179) {
        throw new Error(`Unable to detect talent: '${talentName}'`);
      }

      return rank;
    }
    case "Improved Overpower": {
      const [, iconTexture, , , rank] = GetTalentInfo(1, 10);

      if (iconTexture !== 135275) {
        throw new Error(`Unable to detect talent: '${talentName}'`);
      }

      return rank;
    }
    case "Tactical Mastery": {
      const [, iconTexture, , , rank] = GetTalentInfo(1, 17);

      if (iconTexture !== 136031) {
        throw new Error(`Unable to detect talent: '${talentName}'`);
      }

      return rank;
    }
  }
}
