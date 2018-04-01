#!/usr/bin/env python
"""
Lint python, typescript and sass files prior to completing git commit.

Define lint settings in:
 - .flake8
 - tslint.json, tsconfig.json
 - sass-lint.yml

INSTALL:
1. Save / Link this file to '.git/hooks/pre-commit' file in your git repository
2. Run:
    - Stage / Commit with git as usual
    - Run 'python .git/hooks/pre-commit --all' to lint all project files
"""
import argparse
import os
import sys
import subprocess


# colorize output
COLORS = {
    "red": "\033[31m",
    "green": "\033[32m",
    "off": "\033[0m",
    "yellow": "\033[93m",
}


def system(*args, **kwargs):
    """
    Run system command.
    """
    kwargs.setdefault('stdout', subprocess.PIPE)
    proc = subprocess.Popen(args, **kwargs)
    out, err = proc.communicate()
    return out


def get_changed_files():
    """
    Get python files from 'files to commit' git cache list.
    """
    project_root = os.path.dirname(
            os.path.dirname(
                os.path.realpath(__file__)))
    files = []
    filelist = system('git', 'diff', '--cached', '--name-status').strip()

    for line in filelist.decode().split('\n'):
        if not line:
            break
        segments = line.strip().split()
        action = segments[0]
        filename = segments[-1]
        if action != 'D':
            files.append((filename, os.path.join(project_root, filename)))
    return files


def flake8(all_files=False):
    """
    Run flake8
    """
    config_file = os.path.join(os.path.abspath(os.curdir), '.flake8')
    if not os.path.exists(config_file) or not os.path.isfile(config_file):
        print(f"ERROR: flake8 config file not found at {config_file}")
        sys.exit(1)

    args = ["flake8", f"--config={config_file}"]

    if not all_files:
        files = get_changed_files()
        py_file_paths = []
        for file_name, file_path in files:
            if file_name.endswith('.py'):
                py_file_paths.append(file_path)
        if not py_file_paths:
            print("flake8: %(yellow)sSKIP%(off)s" % COLORS)
            return
        args.extend(py_file_paths)

    return list(filter(None, system(*args).decode().strip().split('\n')))


def tslint(all_files=False):
    """
    Run tslint
    """
    config_file = os.path.join(os.path.abspath(os.curdir), 'tslint.json')
    if not os.path.exists(config_file) or not os.path.isfile(config_file):
        print(f"ERROR: tslint config file not found at {config_file}")
        sys.exit(1)

    project_file = os.path.join(os.path.abspath(os.curdir), 'tsconfig.json')
    if not os.path.exists(project_file) or not os.path.isfile(project_file):
        print(f"ERROR: typescript config file not found at {project_file}")
        sys.exit(1)

    args = ["./node_modules/tslint/bin/tslint",
            "-c", config_file, '-p', project_file]

    if not all_files:
        files = get_changed_files()
        ts_file_paths = []
        for file_name, file_path in files:
            if file_name.endswith('.ts'):
                ts_file_paths.append(file_path)
        if not ts_file_paths:
            print("tslint: %(yellow)sSKIP%(off)s" % COLORS)
            return
        args.extend(ts_file_paths)

    return list(filter(None, system(*args).decode().strip().split('\n')))


def sass_lint(all_files=False):
    """
    Run sass-lint
    """
    config_file = os.path.join(os.path.abspath(os.curdir), "sass-lint.yml")
    if not os.path.exists(config_file) or not os.path.isfile(config_file):
        print(f"ERROR: sass-lint config file not found at {config_file}")
        sys.exit(1)

    args = ["./node_modules/sass-lint/bin/sass-lint.js",
            "-c", config_file, "-v", "-q"]

    if not all_files:
        files = get_changed_files()
        sass_file_paths = []
        for file_name, file_path in files:
            if file_name.endswith('.scss'):
                sass_file_paths.append(file_path)
        if not sass_file_paths:
            print("sass-lint: %(yellow)sSKIP%(off)s" % COLORS)
            return
        args.extend(sass_file_paths)

    return list(filter(None, system(*args).decode().strip().split("\n")))


def main(all_files=False):
    """
    Do the work
    """
    flake8_errors = flake8(all_files)
    tslint_errors = tslint(all_files)
    sass_lint_errors = sass_lint(all_files)

    if flake8_errors:
        print("flake8: %(red)sFAIL%(off)s" % COLORS)
        print()
        print("\n".join(sorted(flake8_errors)))
        print("---")
    else:
        print("flake8: %(green)sOK%(off)s" % COLORS)
    if tslint_errors:
        print("tslint: %(red)sFAIL%(off)s" % COLORS)
        print()
        print("\n".join(sorted(tslint_errors)))
        print("---")
    else:
        print("tslint: %(green)sOK%(off)s" % COLORS)
    if sass_lint_errors:
        print("sass-lint: %(red)sFAIL%(off)s" % COLORS)
        print()
        print("\n".join(sorted(sass_lint_errors)))
        print("---")
    else:
        print("sass-lint: %(green)sOK%(off)s" % COLORS)

    if flake8_errors or tslint_errors or sass_lint_errors:
        sys.exit(1)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Run the linters. Default: staged files.")
    parser.add_argument(
        "-a", "--all", action="store_true", help="lint all files")

    args = parser.parse_args()
    main(args.all)
