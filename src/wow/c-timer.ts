declare const C_Timer: {
  // https://wowpedia.fandom.com/wiki/API_C_Timer.After
  After(this: void, seconds: number, callback: () => void): void;
};
