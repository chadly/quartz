import { format as formatDateFn, formatISO } from "date-fns"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

const TimeMeta = ({ value }: { value: Date }) => (
  <time dateTime={formatISO(value)} title={formatDateFn(value, "ccc w")}>
    {formatDateFn(value, "MMM do yyyy")}
  </time>
)

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      const segments: JSX.Element[] = []

      if (fileData.dates) {
        if (fileData.dates.created) {
          segments.push(
            <span>
              🌿 Planted <TimeMeta value={fileData.dates.created} />
            </span>,
          )
        }

        if (fileData.dates.modified) {
          segments.push(
            <span>
              🧤 Last tended <TimeMeta value={fileData.dates.modified} />
            </span>,
          )
        }
      }

      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(<span>⏲ {displayedTime}</span>)
      }

      segments.push(
        <a
          href={`https://github.com/chadly/garden/commits/master/${fileData.filePath}`}
          target="_blank"
        >
          🗓️ History
        </a>,
      )

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
