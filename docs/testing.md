# Test-Driven Development (TDD)

1. Write tests before implementation: Always write failing tests first, then implement the minimum code to make them pass
2. Red-Green-Refactor cycle: Follow the TDD cycle strictly:
   - Red: Write a failing test
   - Green: Write minimal code to make the test pass
   - Refactor: Improve code while keeping tests green
3. Test naming: Use descriptive test names that explain the behavior being tested
4. Test structure: Use the Arrange-Act-Assert pattern consistently

### Testing Requirements
- Before editing any code: Write tests first to define expected behavior
- New features: Must have comprehensive test coverage before implementation
- Bug fixes: Add regression tests before fixing the bug
- Refactoring: Ensure all existing tests pass throughout the process
- Test file principle: In principle, create one test file per implementation file.
- Whenever you modify a test, be sure to run the tests immediately and confirm that they work as expected.
- Always include the test library (e.g., Vitest) import statement at the top of every test file. Example: `import { describe, it, expect } from 'vitest';`


### Test Setup
Vitest is configured as the testing framework for unit and integration tests across all workspaces.
- Unit tests: Vitest for component and utility testing
- Integration tests: Vitest for API endpoints and database interactions
- E2E tests: Playwright for full user journey testing (To Be Configured)
- Test commands: The following scripts are available in each `package.json`:
  - `test`: Runs tests once
  - `test`: Runs tests and outputs results in JSON format
  - `test:watch`: Runs tests in watch mode
  - `test:coverage`: Runs tests and generates coverage report

