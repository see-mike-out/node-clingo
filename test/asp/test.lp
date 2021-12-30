% Testset from: https://potassco.org/clingo/run/

% instance
motive(harry).
motive(sally).
guilty(harry).

% encoding
innocent(Suspect) :- motive(Suspect), not guilty(Suspect).

#show innocent/1.