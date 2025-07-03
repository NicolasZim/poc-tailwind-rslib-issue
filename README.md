# `poc-tailwind-rslib-issue`

A minimal reproduction repository to demonstrate an issue with Tailwind CSS (V4) compilation and `@theme static` within a library context.

## 🎯 Project Goal

This repository aims to simulate a scenario where Tailwind CSS, despite using the `@theme static` directive, fails to generate utilities for custom theme variables unless those variables are explicitly "used" within the same project.

Tailwind's default behavior is to generate only used utilities for optimal bundle size. However, the `@theme static` directive is intended to override this, forcing the generation of all specified utilities regardless of usage. This behavior does not appear to be working as expected when a library (`project-a`) defines custom theme variables that are consumed by another project (`project-b`).


## 💡 The Problem

`project-a` defines custom CSS variables within its Tailwind theme using `@theme static`. The intention is for `project-b` to consume these variables as Tailwind utilities.

However, only the custom variables that are *actually used* within `project-a`'s codebase are compiled into utilities in `project-a`'s `dist` output. The unused, but `@theme static`-defined, variables do not generate corresponding utilities, making them unavailable for `project-b`.

This creates a challenge when `project-b` needs to utilize the full set of custom colors defined in `project-a`'s theme.


## 🛠️ Current Workaround

A temporary workaround has been implemented in this repository:

The `postcss` processing step is **removed from `project-a`** and is instead **handled solely by `project-b`**. This allows `project-b` to correctly process all custom variables defined in `project-a`'s theme, even if they weren't explicitly used in `project-a`.

### How to Observe the Issue (Broken State ❌)

To revert to the broken scenario where utilities are not generated:

1.  In `project-a`, add the dependency: `"@tailwind/postcss": "^4.0.4"` to its `package.json`.
2.  Copy the `postcss.config.js` file from `project-b`'s root directory into `project-a`'s root directory.

After these changes, rebuild `project-a` and run `project-b`. You should observe:

  * **❌ Broken State:** The last 4 buttons in `project-b`'s `App.tsx` will have a **white background**.

### How to Observe the Workaround (Working State ✅)

The repository is set up by default to demonstrate the workaround:

  * **✅ Working State:** The last 4 buttons in `project-b`'s `App.tsx` will display their **intended custom background colors**.


## 🎯 My Goal

My primary objectives are:

1.  **Force Tailwind to build all `@theme static` utilities**: Find a configuration or method that ensures all variables defined under `@theme static` in `project-a` are compiled into utilities, regardless of their usage within `project-a` itself.
2.  **Enable seamless consumption in `project-b`**: Discover a robust way for `project-b` to utilize these utilities from `project-a`'s `dist` output.


## 🕵️ How to Verify Functionality

To understand and test the behavior:

1.  **Define Custom Variables:**

      * In `project-a/theme/theme.css`, add a new group of variables, e.g., `--color-custom-blue-10`, `--color-custom-blue-25`, etc.
      * **Crucially, use only a *few* of these variables as utilities** (e.g., `text-custom-blue-10` or `bg-custom-blue-25`) within `project-a`'s components. The core issue relies on Tailwind *not* building utilities unless you explicitly use them in the defining project. The goal is for them to *still build* so they can be used in `project-b`.

2.  **Build `project-a`:**

    ```bash
    cd project-a
    pnpm build
    ```

3.  **Inspect `project-a`'s Build Output:**

      * Check `project-a/dist/theme/theme.css`.

      * **Verify if both the variables AND their corresponding Tailwind utilities were generated.**

          * You should see something similar to:

        <!-- end list -->

        ```css
        /* Variables */
        @layer theme {
          :root, :host {
            /* ... other variables ... */
            --color-custom-blue-10: #eaeeee; /* Expected: new custom variable */
            /* ... more custom variables ... */
          }
        }

        /* Utilities */
        @layer utilities {
          /* ... other utilities ... */
          .bg-custom-blue-10 { /* Expected: corresponding utility for custom variable */
            background-color: var(--color-custom-blue-10);
          }
          /* ... more custom utilities ... */
        }
        ```

4.  **Run `project-b` and Visual Check:**

    ```bash
    cd project-b
    pnpm install # or pnpm i
    pnpm dev
    ```

      * Open `project-b` in your browser.
      * Visually confirm if the new custom classes (e.g., `bg-custom-blue-XX`) are correctly applying styles in the UI.

-----

## 🔬 Things I've Tried

  * **Removing `static` from `@theme`**: Tested to see if the `static` keyword was causing an issue, but it did not resolve the problem.
  * **Removing PostCSS from `project-a`**: This is the current workaround that successfully allows utilities to be generated correctly in `project-b`.
  * **Setting up different configurations in `RSLib`, `RSBuild`, or alternative CSS import methods**: Explored various build configuration adjustments within `RSLib` and `RSBuild`, as well as different approaches to importing CSS files, but none yielded the desired outcome.
  * **Testing different variable names**: Considered potential naming conflicts or reserved namespaces and experimented with alternative variable naming conventions, but the core issue persisted.
