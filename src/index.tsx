import { Control } from './Control';
import { Preview } from './Preview';
import { schema } from './schema';

window.CMS.registerWidget('rss', Control, Preview, schema);
