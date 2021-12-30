import { PythonShell, Options } from 'python-shell';
import { NcConfig } from './configObj';
import { DefaultNcConfig } from './configDefault';
import { compileConfig } from './compileConfig';
// import { cb_func } from 'promisify';

// from: https://decipher.dev/30-seconds-of-typescript/docs/promisify/
const promisify = (func: Function) => (...args: any[]) =>
  new Promise((resolve, reject) =>
    func(...args, (err: Error, result: any) =>
      err ? reject(err) : resolve(result)
    )
  );

const pyshellRun = promisify(PythonShell.run);

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

    let outcome = await pyshellRun('./src/runClingo.py', pythonShellOptions);
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