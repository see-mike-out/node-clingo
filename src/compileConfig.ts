import { NcConfig } from './configObj';

export function compileConfig(config: NcConfig): NcConfigCompiled {
  let compiled: NcConfigCompiled = {};
  Object.keys(config).forEach((key: string, index: number, array: string[]) => {
    let typedKey = key as keyof NcConfig
    if (typeof config[key as keyof NcConfig] === "string") {
      compiled[key as keyof NcConfigCompiled] = config[key as keyof NcConfig] as string;
    } else if (typeof config[key as keyof NcConfig] === "boolean") {
      compiled[key as keyof NcConfigCompiled] = config[key as keyof NcConfig]?.toString();
    } else if (typeof config[key as keyof NcConfig] === "number") {
      compiled[key as keyof NcConfigCompiled] = config[key as keyof NcConfig]?.toString();
    } else if (typeof config[key as keyof NcConfig] === "object") {
      compiled[key as keyof NcConfigCompiled] = Object.values(config[key as keyof NcConfig] as object)?.join(',');
    }
  });
  return compiled;
}

export interface NcConfigCompiled {
  base_url?: string;
  is_debug?: string;
  solve_limit?: string;
  parallel_mode?: string;
  global_restarts?: string;
  distribute?: string;
  integrate?: string;
  enum_mode?: string;
  project?: string;
  models?: string;
  opt_mode?: string;
}