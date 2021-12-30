"use strict";
exports.__esModule = true;
exports.DefaultNcConfig = void 0;
exports.DefaultNcConfig = {
    // default configuration
    base_url: "",
    is_debug: false,
    solve_limit: ['umax', 'umax'],
    parallel_mode: [1, 'compete'],
    global_restarts: 'no',
    distribute: ['conflict', 'global', 4, 4194303],
    integrate: ['gp', 1024, 'all'],
    enum_mode: "auto",
    project: 'no',
    models: -1,
    opt_mode: 'opt'
};
