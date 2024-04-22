# Packages Rules

- In our "project-recode" folder, we keep things simple by following a clear rule for handling packages. This helps us organize dependencies in a way that's easy to manage and update in the future.

## How We Manage Packages

### One Import Hub

- Every installed package will be import in one file and export from it or just create function or hook where this package is used and then use that function or hook in project so if in feature if we change or replace some package it will be easy.

- Packages that we use in different parts of our project are neatly tucked into custom hooks. This way, we can reuse them without repeating code.
