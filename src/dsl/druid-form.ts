export type DruidForm = (typeof druidForms)[number];

const druidForms = ["aquatic", "bear", "cat", "humanoid", "moonkin", "travel"] as const;

export function isDruidForm(value: string): value is DruidForm {
  return druidForms.includes(value as DruidForm);
}
