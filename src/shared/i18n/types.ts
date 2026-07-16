/** Recursive shape every translation dictionary must satisfy. */
export type TranslationDict = {
  readonly [key: string]: string | TranslationDict;
};
