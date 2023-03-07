import * as React from 'react';
import Parser from 'rss-parser';

export interface ControlProps {
  onChange(value: string): void;
  forID: string;
  value?: string;
  classNameWrapper: string;
  field: {
    get(path: string, defaultValue: string): string;
  };
}

export function Control({
  onChange,
  forID,
  value,
  classNameWrapper,
  field,
}: ControlProps) {
  const feedUrl = field.get('feed_url', '');
  const idField = field.get('id_field', 'id');
  const titleField = field.get('title_field', 'title');
  const [items, setItems] = React.useState<Record<string, any>[]>([]);

  React.useEffect(() => {
    if (feedUrl) {
      (async () => {
        const parser = new Parser();
        try {
          const feed = await parser.parseURL(feedUrl);
          setItems(feed.items);
        } catch {
          console.error('Invalid feed URL.');
        }
      })();
    }
  }, [feedUrl]);

  return (
    <select
      className={classNameWrapper}
      id={forID}
      value={value}
      onChange={evt => onChange(evt.target.value)}
    >
      {items.map(item => (
        <option value={item[idField]}>{item[titleField]}</option>
      ))}
    </select>
  );
}
