# Code Coverage

Assessing Rust code coverage. There are two scenarios I need to cover: 

 * Unit/integration testing via Cargo. All Rust tools aim to cover this scenario.
 * Capture coverage data from a deployed binary that is target of an E2E test suite. I need to be able to collect and process coverage information as seperate processes.

A key concern when implementing coverage testing is that false negatives will cause a lot of extra analysis. Manual inspection will be required to invalidate a false negative. During testing againt a real project I saw some suspect uncovered segments that are likely false negatives, but I have not yet done the validation of those.

# Collection Modes

There are a few ways to gather coverage data for Rust applications.

* Use ptrace (or an intermediate debugger) and debuginfo to correlate line coverage.
* Use `-Zprofile` to instruct LLVM to emit gcov style coverage information based on debuginfo.
* Use `-Zinstrument-coverage` to enable rustc/LLVM native coverage information. It is expected that this will be the most accurate method in the future.

The latter two methods require the Nightly channel compiler for the forseeable future. It does appear however that `-Zinstrument-coverage` is closer to stablilization than `-Zprofile`.

In the `codecovsample` project in this repository, all 3 methods had no false positive/negatives detection. However, `-Zinstrument-coverage` had false executability. Multiple segments that should have been marked uncovered executable lines were left as unexecutable lines.

## Zprofile

On my real project I used `-Zprofile` with the flags recommended by grcov and it was very broken. Somehow this broke atomic integer memory ordering and who knows what else. I added a trace message to the code below 

```
let test_id = TEST_ID.fetch_add(1, Ordering::SeqCst).to_string();
trace!("GOT TEST_ID: {}", test_id);
```

`(O_o)` TEST_ID is an `AtomicI32`...

```
[2021-04-02T15:09:03Z TRACE ] GOT TEST_ID: 0
[2021-04-02T15:09:03Z TRACE ] GOT TEST_ID: 0
[2021-04-02T15:09:03Z TRACE ] GOT TEST_ID: 0
[2021-04-02T15:09:03Z TRACE ] GOT TEST_ID: 0
[2021-04-02T15:09:03Z TRACE ] GOT TEST_ID: 0
[2021-04-02T15:09:03Z TRACE ] GOT TEST_ID: 1
[2021-04-02T15:09:03Z TRACE ] GOT TEST_ID: 0
```

At the end the process crashes trying to produce gcda files:

```
profiling: testing-dce87064c42771b2.gcda: cannot merge previous GCDA file: mismatched number of counters (2)
profiling: testing-dce87064c42771b2.gcda: cannot merge previous GCDA file: corrupt arc tag (0x37ac5442)
```

# Tools

These are all the tools in common use publicly.

Tooling needs to easily support merging of multiple indepedent test runs to get accurate coverage of shared libraries tested through integration tests.

## cargo-kcov

This is a lightweight wrapper around the kcov tool. It runs cargo builds with extra `RUSTFLAGS` and merges kcov databases for you before generating the final report.

Collection Modes:

 * ptrace + debuginfo
 * lldb + debuginfo

Outputs: 

 * json
 * xml
 * html
 * coveralls

It is fairly straightforward use kcov (outside of cargo-kcov) for E2E testing in collect only mode and then generate reports with source code later in report only mode.

cargo-kcov is relatively unmaintained. I found a bug that doesn't allow rerun without rebuilding (the code needs to be changed to look in deps build folder for test binaries). This made testing quite time consuming.

Running test under kcov was more than 10x slower than normal. Somehow kcov/ptrace is breaking some test executions. I haven't been able to figure out why yet. You can't attach a debugger because the process is already being "debugged" by kcov.

```
test result: FAILED. 8 passed; 2 failed; 0 ignored; 0 measured; 0 filtered out; finished in 31.03s
```

See also:
 * https://github.com/kennytm/cargo-kcov
 * https://github.com/SimonKagstrom/kcov

## grcov 

Collection Modes:

 * -Zprofile (**Nightly Only**) - run with gcda files
 * -Zinstrument-coverage (**Nightly Only**) - run with profraw files

Outputs: 

 * json
 * lcov
 * html
 * coveralls

The collection and processing is completely seperate which is great usability. It handled the profraw and gcda fine for the `codecovsample` and produces nice looking reports.

However for my real project I was only able to produce profraw outputs and grcov chokes on these:

```
$ grcov ./prof/ -s . --binary-path ./target/debug/ -t html --branch --ignore-not-existing -o grcov 
15:42:29 [ERROR] Execution count overflow detected.
```

See also:

 * https://github.com/mozilla/grcov
 * https://marco-c.github.io/2020/11/24/rust-source-based-code-coverage.html

## tarpaulin

This is sort of like kcov implemented in Rust.

Collection Modes:
 * ptrace + debuginfo - default option
 * -Zinstrument-coverage (**Nightly Only**) - engine option in config file (code on master - not released yet)

Outputs: 
 * json
 * lcov
 * html
 * coveralls

Good documentation. Nice integration with cargo. They make it easy to use cfg_attrs to include/exclude blocks. Seems faster than kcov despite also using ptrace.

AFAIK there isn't any option to use it outside of a cargo workspace. This makes use in E2E tests complicated. I haven't tried it on my project for this reason.

I have used this on a side-project and it works very well.

See also:

* https://github.com/xd009642/tarpaulin

## llvm tools

These tools are lower-level and require some scripting to transform the data in to something useful. It's failry straight-forward and documented well in the unstable book.

Collection Modes:

 * -Zinstrument-coverage (**Nightly Only**)

Outputs: 
 * json
 * lcov
 * html
 * gcov

See also:
 * https://blog.rust-lang.org/inside-rust/2020/11/12/source-based-code-coverage.html
 * https://doc.rust-lang.org/nightly/unstable-book/compiler-flags/source-based-code-coverage.html

# Conclusion

I'm using the LLVM tools for now. 