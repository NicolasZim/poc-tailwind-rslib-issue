# poc-tailwind-rslib-issue

This repo intent is to recreate a scenario where tailwind does not build classes
properly (intentionally), unless said classes were cast into a
element/component.

Furthermore, tailwind does that intentionally in order to make the build files
as small as possible, however, I do not intent to minify them, on top of that
the directive `static` on `@theme` in the `theme.css` is known for FORCING
tailwind to generate utilities regardless if they were used or not, which does
not look like working either.

# My goal

Either force tailwind to build them or find a workaround where I can use the
classes from `project-a` in `project-b`.

# How to find out if it is working?

You need to setup like this:

- Add a variable group (color-blue-1, color-blue-2, color-blue-3) color in
  theme.css
- Use a few of said variables as a utility (aka
  "text-${variable}" or "bg-${variable}" in a element)
- Said variables should be used more in `project-b` than `project-a`, because
  the core issue relies on tailwind only building utilities when you use them in
  your project (the idea is to not use them, still build, so they can be used in
  the `project-b`)

Then to test if it worked:

- Build the `project-a`
- Check the build files in dist and double check if the varaibles AND the
  utilities were created, should look like the following (in
  `dist/theme/theme.css`):
  ```
  /* variables bellow */
  @layer theme {
    :root, :host {
      ...
      --color-custom-blue-10: #eaeeee;
      ...
    }
  }

  /* utilities bellow */
  @layer utilities {
    ...
    .bg-custom-blue-10 {
      background-color: var(--color-custom-blue-10);
    }
    ...
  }
  ```
- Final check is running `pnpm build` in `project-a`, then `pnpm i; pnpm dev` in
  `project-b` and visually check if said classes are working in the UI.
