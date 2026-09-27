/**
 * Single source of truth. Facts here are taken from the resume
 * (rohit_behera_resume_legacy_first.tex, 31 Jul 2026) and the GitHub
 * profile README, verified against the GitHub API on 2026-08-03.
 *
 * Phone number deliberately omitted — it is on the resume, which is the
 * right place for it. A public page does not need it.
 */

export const site = {
  name: "Rohit Behera",

  role: "Backend Engineer",

  /** The hero line. Specific enough that nobody else could sign it. */
  statement: "I build banking APIs where a retry has to be idempotent.",

  now: "Open to backend roles",

  location: "Chennai, India",
  timezone: "Asia/Kolkata",

  /** The address on the resume, not the personal one. */
  email: "rohit.behera12232@gmail.com",

  links: [
    {
      label: "GitHub",
      href: "https://github.com/r0h1tb",
      handle: "@r0h1tb",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rohit-behera-64877b182/",
      handle: "rohit-behera",
    },
    {
      label: "Pull requests",
      href: "https://github.com/pulls?q=is%3Apr+author%3Ar0h1tb",
      handle: "author:r0h1tb",
    },
  ],
} as const;

export const nav = [
  { label: "Index", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
] as const;
