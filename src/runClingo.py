import clingo
import sys
import sys
from typing import List, Dict
import os
import sys
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
