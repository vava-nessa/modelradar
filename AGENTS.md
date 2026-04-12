RULES

1. use sub agents to help you when developing, use context7 mcp or exa.ai / brave search and web search to help you fix problems and bugs. read documentation and best practices before coding.

2. check for errors by running a build and dev server after every change you make to make sure everything still works, also run typecheck and biome check after every change you make.

3. tests : run tests after every change you make to make sure everything still works. if test is missing, you need to add a new test, create a new test file and add it to the test suite.

4. after every meaningful change: push commit + check Vercel deploy result + verify page loads correctly with chrome-devtools.

   ```
   steps:
   a. git add . && git commit -m "fix|feat|chore: description"
   b. vercel_deploy_to_vercel (deploy to Vercel)
   c. wait for deploy URL from vercel_deploy_to_vercel result
   d. chrome-devtools_navigate_page to the deployed URL
   e. chrome-devtools_take_snapshot to confirm page renders correctly (no blank/error pages)
   f. pnpm build to verify build still passes locally
   g. If any step fails, fix and repeat
   ```

5. always verify with real browser check — don't assume the deploy worked. Use chrome-devtools to screenshot or snapshot the actual rendered page on the Vercel deployment URL.

