import { filter } from 'lodash';

export function selectedFilter(selected, list) {
  return filter(list, e => selected.includes(e._$id));
}
