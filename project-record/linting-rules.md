# ESlint Rules

- we need to turn this off in eslint config file
  - Reason: standard we defined for our projects
    - we need semicolon in the end of our JS statements.
    - @typescript-eslint/semi
    - @typescript-eslint/member-delimiter-style
    - @typescript-eslint/indent
    - multiline-ternary
  - @typescript-eslint/strict-boolean-expressions
    - Reason: in below code as you can see that the filters?.search?.trim()?.length is correct we are putting ? but typescript till gives error to it that object can be undefined
      if (filters?.search?.trim()?.length) {
      \_data = \_data?.filter(
      (el) =>
      el?.user?.company?.trim()?.toLowerCase() ===
      filters?.search?.trim()?.toLowerCase()
      );
      }
