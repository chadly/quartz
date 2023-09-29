import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "🧠🌳",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    baseUrl: "www.chadly.net",
    ignorePatterns: ["private", "templates", "templater", ".obsidian", "journal"],
    defaultDateType: "modified",
    theme: {
      typography: {
        header: "Titillium Web",
        body: "Titillium Web",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fffcf9",
          lightgray: "#f4eae2",
          gray: "#e0d4c3",
          darkgray: "#958779",
          dark: "#6e594f",
          secondary: "#5b7c99",
          tertiary: "#b2ceb8",
          highlight: "rgba(173, 192, 198, 0.15)",
        },
        darkMode: {
          light: "#332f2c",
          lightgray: "#514c47",
          gray: "#827d75",
          darkgray: "#ece4dc",
          dark: "#f5efe7",
          secondary: "#9eb6c1",
          tertiary: "#c5d6ca",
          highlight: "rgba(193, 207, 213, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem", "git"],
      }),
      Plugin.SyntaxHighlighting(),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
