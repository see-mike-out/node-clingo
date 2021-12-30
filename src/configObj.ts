// Configuration Object class
interface NcConfig extends Object {
  // library config
  // base_url: base url for files
  base_url?: string;

  // is_debug: whether it is under a debugging mode
  is_debug?: boolean;

  // solver configs
  // solve_limit: stop search after [0] conflicts or [1] restarts
  solve_limit?: [number | 'umax', number | 'umax'];

  // parallel_mode: Run parallel search with given number of threads
  // [<n>, <mode>]     
  // <n>   : Number of threads to use in search
  // <mode>: Run competition or splitting based search [compete]
  parallel_mode?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 |
  18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 |
  37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 |
  56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | {
    0: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 |
    18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 |
    37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 |
    56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64,
    1?: 'compete' | 'split'
  }

  // global_restarts: Configure global restart policy
  // Maximal number of global restarts (0 | 'no'=disable)
  global_restarts?: `${number | 'no'}`

  // distribute: configure nogood distribution
  // <type>, <mode>, lbd, size
  // <type>: distribute {all | sort | conflict | loop} nogoods [conflict]
  // <mode>: use {global|local} distribution [global]
  distribute?: 'all' | 'sort' | 'conflict' | 'loop' | {
    0: 'all' | 'sort' | 'conflict' | 'loop',
    1?: 'global' | 'local',
    2?: number,
    3?: number
  };

  // integrate: Configure nogood integration
  // <pick>[,<n>][,<topo>
  // <pick>: Add {all|unsat|gp(unsat wrt guiding path)|active} nogoods
  // <n>   : Always keep at least last <n> integrated nogoods   [1024]
  // <topo>: Accept nogoods from {all|ring|cube|cubex} peers    [all]
  integrate?: 'all' | 'unsat' | 'gp' | 'active' | {
    0: 'all' | 'unsat' | 'gp' | 'active',
    1?: number,
    2?: 'all' | 'ring' | 'cube' | 'cubex'
  }

  // enum_mode: Configure enumeration algorithm
  // bt      : Backtrack decision literals from solutions
  // record  : Add nogoods for computed solutions
  // domRec  : Add nogoods over true domain atoms
  // brave   : Compute brave consequences (union of models)
  // cautious: Compute cautious consequences (intersection of models)
  // auto    : (default) Use bt for enumeration and record for optimization
  enum_mode?: 'bt' | 'record' | 'brave' | 'cautios' | 'auto';

  // project: Enable projective solution enumeration
  // {show|project|auto|no}[,<bt {0..3}>]
  // Project to atoms in show or project directives, or select depending on the existence of a project directive [no]
  // <bt> : Additional options for enumeration algorithm 'bt': Use activity heuristic 
  // (1) when selecting backtracking literal\n  nd/or progress saving (2) when retracting solution literals"
  project?: 'show' | 'project' | 'auto' | 'no' | {
    0: 'show' | 'project' | 'auto' | 'no',
    1?: 0 | 1 | 2 | 3
  }

  // models: compute at most n models; where 0 means all;
  models?: number; // the number of models

  // opt_mode: 'Configure optimization algorithm
  // <mode {opt|enum|optN|ignore}>[,<bound>...]
  // <mode>
  // - opt   : Find optimal model  
  // - enum  : Find models with costs <= <bound>
  // - optN  : Find optimum, then enumerate optimal models
  // - ignore: Ignore optimize statements
  // <bound> : Set initial bound for objective function(s)'
  opt_mode?: 'opt' | 'enum' | ['enum', number] | 'optN' | 'ignore';
}

export { NcConfig };