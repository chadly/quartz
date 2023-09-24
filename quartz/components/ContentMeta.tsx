import readingTime from "reading-time"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import type { JSX } from "preact"

import { format as formatDateFn, formatISO } from "date-fns"

const TimeMeta = ({ value }: { value: Date }) => (
  <time dateTime={formatISO(value)} title={formatDateFn(value, "ccc w")}>
    {formatDateFn(value, "MMM do yyyy")}
  </time>
)

export default (() => {
  function ContentMetadata({ cfg, fileData }: QuartzComponentProps) {
    const text = fileData.text
    if (text) {
      const segments: JSX.Element[] = []
      const { text: timeTaken, words: _words } = readingTime(text)

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

      segments.push(<span>⏲ {timeTaken}</span>)

      segments.push(
        <a
          href={`https://github.com/chadly/garden/commits/v4/${fileData.filePath}`}
          target="_blank"
        >
          🗓️ History
        </a>,
      )

      return (
        <p class="content-meta">
          {segments.map((meta, idx) => (
            <>
              {meta}
              {idx < segments.length - 1 ? <br /> : null}
            </>
          ))}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = `
  .content-meta {
    display:flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10;

    margin-top: 0;
    color: var(--gray);
  }
  `
  return ContentMetadata
}) satisfies QuartzComponentConstructor
