import React from 'react';

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
        try {
          const headers = new Headers();
          headers.set('accept', 'text/xml');
          const feed = await fetch(feedUrl, { headers });
          const text = await feed.text();

          const parser = new DOMParser();
          const xml = parser.parseFromString(text, 'text/xml');

          const itemElements = xml.querySelectorAll('item');
          const items = Array.from(itemElements).map(item => ({
            id: item.querySelector(idField)?.textContent ?? '',
            title: item.querySelector(titleField)?.textContent ?? '',
          }));
          setItems(items);
        } catch {
          console.error('Invalid feed URL.');
        }
      })();
    }
  }, [feedUrl, idField, titleField]);

  return (
    <select
      className={classNameWrapper}
      id={forID}
      value={value}
      onChange={evt => onChange(evt.target.value)}
    >
      {items.map(item => (
        <option value={item.id}>{item.title}</option>
      ))}
    </select>
  );
}
