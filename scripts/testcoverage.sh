#!/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
cd $DIR/../codecovsample
PATH=$PATH:$(rustc --print sysroot)/lib/rustlib/x86_64-unknown-linux-gnu/bin
OUTPUT_DIR=$DIR/../output

rm -r $OUTPUT_DIR/../output/*

### source-based grcov

(
    cargo clean
    export RUSTFLAGS="-Zinstrument-coverage"
    export LLVM_PROFILE_FILE="$DIR/../codecovsample/target/debug/profdata/%m.profraw"
    COVERAGE_DATA_DIR=$(dirname $LLVM_PROFILE_FILE)
    cargo +nightly test --no-run
    rm $COVERAGE_DATA_DIR/*.profraw
    cargo +nightly test
    grcov $COVERAGE_DATA_DIR -s . --binary-path ./target/debug/ -t html --branch --ignore-not-existing -o $OUTPUT_DIR/grcov-profraw

### source-based llvm tools
    mkdir $OUTPUT_DIR/llvm-profraw
    TEST_BINARY_JSON="${COVERAGE_DATA_DIR}/test.json"
    cargo +nightly test --no-run --message-format=json > ${TEST_BINARY_JSON}
    OBJECT_OPTIONS=$(cat ${TEST_BINARY_JSON} | jq -r "select(.profile.test == true) | .filenames[]" | grep -v dSYM - | xargs -n1 echo --object)
    llvm-profdata merge --sparse ${COVERAGE_DATA_DIR}/*.profraw --output=${COVERAGE_DATA_DIR}/merged.profdata
    llvm-cov report --instr-profile=${COVERAGE_DATA_DIR}/merged.profdata ${OBJECT_OPTIONS} --summary-only --ignore-filename-regex=/.cargo/ --ignore-filename-regex=/rustc/ > ${OUTPUT_DIR}/llvm-profraw/report.txt
    llvm-cov show --instr-profile=${COVERAGE_DATA_DIR}/merged.profdata ${OBJECT_OPTIONS} --ignore-filename-regex=/.cargo/ --ignore-filename-regex=/rustc/ --show-line-counts-or-regions --Xdemangler=rustfilt > ${OUTPUT_DIR}/llvm-profraw/source.txt
    llvm-cov show --use-color --instr-profile=${COVERAGE_DATA_DIR}/merged.profdata ${OBJECT_OPTIONS} --ignore-filename-regex=/.cargo/ --ignore-filename-regex=/rustc/ --show-line-counts-or-regions --Xdemangler=rustfilt > ${OUTPUT_DIR}/llvm-profraw/source-color.txt
)

### profile-based grcov

(
    cargo clean
    export CARGO_INCREMENTAL=0
    export RUSTFLAGS="-Zprofile -Ccodegen-units=1 -Copt-level=0 -Clink-dead-code -Coverflow-checks=off -Zpanic_abort_tests -Cpanic=abort"
    export RUSTDOCFLAGS="-Cpanic=abort"
    cargo +nightly test
    grcov ./target/debug/deps -s . -t html --branch --ignore-not-existing -o $OUTPUT_DIR/grcov-profile
)

### ptrace-based tarpaulin

cargo clean
cargo tarpaulin -v --out Html --output-dir $OUTPUT_DIR/tarpaulin-ptrace

### ptrace-based cargo-kcov

cargo kcov -o $OUTPUT_DIR/cargokcov-ptrace --kcov /usr/bin/kcov -- --include-path=./src

