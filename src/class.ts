import { PythonShell, Options } from 'python-shell';
import { NcConfig } from './configObj';
import { DefaultNcConfig } from './configDefault';
import { compileConfig } from './compileConfig';

// from: https://decipher.dev/30-seconds-of-typescript/docs/promisify/
const promisify = (func: Function) => (...args: any[]) =>
  new Promise((resolve, reject) =>
    func(...args, (err: Error, result: any) =>
      err ? reject(err) : resolve(result)
    )
  );

const pyshellRun = promisify(PythonShell.runString);

const pyPro = `
import clingo
import sys
import os
import json


def ClingoRun(statements=[], files=[], config={}):
    prg = clingo.Control()
    for sub in statements:
        prg.add("base", [], sub)
    for lpf in files:
        prg.load(os.path.join(config["base_url"], lpf))
    # prg.add("base", [], "")
    prg.ground([("base", [])])

    if "solve_limit" in config:
        prg.configuration.solve.solve_limit = config["solve_limit"]

    if "parallel_mode" in config:
        prg.configuration.solve.parallel_mode = config["parallel_mode"]

    if "global_restarts" in config:
        prg.configuration.solve.global_restarts = config["global_restarts"]

    if "distribute" in config:
        prg.configuration.solve.distribute = config["distribute"]

    if "integrate" in config:
        prg.configuration.solve.integrate = config["integrate"]

    if "enum_mode" in config:
        prg.configuration.solve.enum_mode = config["enum_mode"]

    if "project" in config:
        prg.configuration.solve.project = config["project"]

    if "models" in config:
        prg.configuration.solve.models = config["models"]

    if "opt_mode" in config:
        prg.configuration.solve.opt_mode = config["opt_mode"]

#     prg.configuration.solve.project = 1
    models = []
    with prg.solve(yield_=True) as handle:
        for model in handle:
            models.append(model.symbols(terms=True, shown=True))
    return models


def ClingoModelParser(models):
    parsed_models = []
    for ml in models:
        ml_str = []
        for sy in ml:
            sy_str = ""
            sy_str = sy_str + sy.name + "("
            args = []
            violation = {}
            for (ai, a) in enumerate(sy.arguments):
                if a.type == clingo.SymbolType.Number:
                    args.append(str(a.number))
                elif a.type == clingo.SymbolType.String:
                    args.append('"' + a.string + '"')
                else:
                    args.append(a.name)
            sy_str = sy_str + ",".join(args)
            sy_str = sy_str + "). "
            ml_str.append(sy_str)
        parsed_models.append(ml_str)
    return parsed_models


if __name__ == "__main__":
    # Always String
    # First (0) is "file name"
    statement = json.loads(sys.argv[1])
    files = json.loads(sys.argv[2])
    config = json.loads(sys.argv[3])
    is_debug = False
    if "is_debug" in config:
        if config["is_debug"] == 'true':
            is_debug = True
    if is_debug:
        print(json.dumps(statement))
        print(json.dumps(files))
        print(json.dumps(config))
    models = ClingoRun(statement, files, config)
    results = ClingoModelParser(models)
    print(json.dumps(results))
    if is_debug:
        print('passed')
`;

export class ClingoStore {
  // A class for storing ASP literal statements and files
  statements: string[]; // literal statement
  files: string[]; // ASP files
  config: NcConfig;

  constructor(_config: NcConfig) {
    this.statements = [];
    this.config = {
      // see config.ts for description
      base_url: _config.base_url || DefaultNcConfig.base_url,
      solve_limit: _config.solve_limit || DefaultNcConfig.solve_limit,
      parallel_mode: _config.parallel_mode || DefaultNcConfig.parallel_mode,
      global_restarts: _config.global_restarts || DefaultNcConfig.global_restarts,
      distribute: _config.distribute || DefaultNcConfig.distribute,
      integrate: _config.integrate || DefaultNcConfig.integrate,
      enum_mode: _config.enum_mode || DefaultNcConfig.enum_mode,
      project: _config.project || DefaultNcConfig.project,
      models: _config.models || DefaultNcConfig.models,
      opt_mode: _config.opt_mode || DefaultNcConfig.opt_mode
    };
    this.files = [];
  }

  addStatements(newStatements: string | string[]) {
    if (typeof newStatements === 'string') {
      this.statements.push(newStatements);
    } else if (typeof newStatements === 'object') {
      for (const newStatement of newStatements) this.statements.push(newStatement);
    }
  }

  addFiles(newFiles: string | string[]) {
    if (typeof newFiles === 'string') {
      this.files.push(newFiles);
    } else if (typeof newFiles === 'object') {
      for (const newFile of newFiles) this.files.push(newFile);
    }
  }

  async run(): Promise<any> {
    let config = JSON.stringify(compileConfig(this.config) || {});
    let statements = JSON.stringify(this.statements || []);
    let files = JSON.stringify(this.files || []);
    let is_debug = this.config.is_debug;
    let pythonShellOptions: Options = {
      mode: 'text',
      pythonOptions: ['-u'],
      args: [statements, files, config]
    };

    let outcome = await pyshellRun(pyPro, pythonShellOptions);
    //  function (err, output) {
    //   if (err) throw err;
    //   console.log('completed');
    //   console.log(outcome);
    //   outcome = output?.map(d => JSON.parse(d as string));
    // });
    let parsedOutcome = JSON.parse((outcome as string[])[(is_debug ? 3 : 0)] || "");

    return parsedOutcome;
  }
}